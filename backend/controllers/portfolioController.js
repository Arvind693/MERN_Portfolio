const expressAsyncHandler = require("express-async-handler");
const { Intro, About, Education, TechStack, Project, Contact, User} = require("../Models/portfolioModel");
require("dotenv").config();

const addNewUser = async (req, res) => {
    const user = req.body;  // Use req.body instead of res.body
    try {
        const newUser = new User(user);
        await newUser.save();  // Use await to save the user properly
        if (newUser) {
            res.status(200).send({
                success: true,
                message: "New User Added Successfully"
            });
        }
    } catch (error) {
        console.log("Error adding new user:", error); 
        res.status(500).send({
            success: false,
            message: "Error adding user",
            error: error.message  // Send a more descriptive error message
        });
    }
};

const adminLogin = async(req,res)=>{
    const {userName,password} = req.body;
    if(!userName || !password){
        return res.status(201).json({
            message:"Please provide all the fields!"
        })
    }
    try {
        const user = await User.findOne({userName,password});
        if(user){
            res.status(200).json({
                data:user,
                success:true,
                message:"Login Successful"
            })
        }else{
            res.status(200).json({
                data:user,
                success:false,
                message:"Invailid Username or Password"
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
const removeProject = async (req, res) => {
    const { id } = req.params;
    try {
        await Project.findByIdAndDelete(id);
        res.status(200).json({ msg: "Project Removed Successfully" })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
};

const addNewProject = async (req, res) => {
    const thumbnail = req.file ? req.file.filename : null;
    const { title, description, technologies, liveLink, codeLink } = req.body;
   
    // Check for missing fields
    if (!title || !description || !technologies || !liveLink || !codeLink||!thumbnail) {
        return res.status(400).send({ msg: "Please fill all the fields" }); // Changed status to 400 for bad request
    }
    
    try {
        // Create and save the new project
        const newProject = new Project({ title, description, technologies, liveLink, codeLink, thumbnail });
        await newProject.save(); // Await the save operation

        // Send success response
        return res.status(200).send({ msg: "New project added successfully" });
    } catch (error) {
        // Handle errors during save
        return res.status(400).send({ msg: error.message }); // Ensure proper error handling
    }
};


const updateProject = async (req, res) => {
    const { id } = req.params;
    const thumbnail = req.file ? req.file.filename : null;
    const { title, description, technologies, liveLink, codeLink } = req.body;
    try {
        await Project.findByIdAndUpdate(
            id,
            { title, description, technologies, liveLink, codeLink, ...(thumbnail && { thumbnail }) },
            { new: true }
        );
        res.status(200).send({ msg: "Project updated successfully" });
    } catch (error) {
        res.status(400).send({ msg: "Failed to update Project" });
    }
}
const getProject = async (req, res) => {
    const { id } = req.params;
    try {
        const projectData = await Project.findById(id)
        res.status(200).send(projectData);
    } catch (error) {
        res.status(400).send({ error: error })
    }
};
const addNewSkill = async (req, res) => {
    const icon = req.file ? req.file.filename : null; // Handle file from multer
    const { name } = req.body;

    // Check if name is provided
    if (!name) {
        return res.status(400).send({ msg: "Skill name is required" });
    }

    try {
        // Create a new TechStack object
        const newSkillData = new TechStack({ name, icon });

        // Save the new skill to the database
        await newSkillData.save();

        // Send success response
        res.status(200).send({ msg: "New TechStack added successfully" });
    } catch (error) {
        // Handle error and send appropriate response
        res.status(500).send({ msg: error.message || "Failed to add new TechStack" });
    }
};

const removeSkill = async (req, res) => {
    const { id } = req.params;
    try {
        await TechStack.findByIdAndDelete(id);
        res.status(200).send({ msg: "TeckStcak Removed Successfully" })
    } catch (error) {
        res.status(400).send({ msg: error })
    }
};

const getSkills = async (req, res) => {
    const { id } = req.params;
    try {
        const skillsData = await TechStack.findById(id)
        res.status(200).send(skillsData);
    } catch (error) {
        res.status(400).send({ error: error })
    }
};
// update skills 
const updateSkills = async (req, res) => {
    const { id } = req.params;
    const icon = req.file ? req.file.filename : null;
    const { name } = req.body;

    try {
        await TechStack.findByIdAndUpdate(
            id,
            { name, ...(icon && { icon }) },
            { new: true }
        );
        res.status(200).send({ msg: "TechStacks updated successfully" })
    } catch (error) {
        res.status(400).send({ msg: "Failed to update TechStacks" })
    }
}

// get education by id
const getEducation = async (req, res) => {
    const { id } = req.params;
    try {
        const education = await Education.findById(id);
        res.status(200).json(education);
    } catch (error) {
        res.status(400).send(error)
    }
}
//update education by id
const updateEducation = async (req, res) => {
    const { id } = req.params;
    const { title, institute, date, link } = req.body;
    try {
        await Education.findByIdAndUpdate(
            id,
            { title, institute, date, link },
            { new: true }
        );
        res.status(200).send({ msg: "Education updated successfully" })
    } catch (error) {
        res.status(400).send({ Error: error })
    }
}

// Remove education data
const removeEducation = async (req, res) => {
    const { id } = req.params;
    try {
        await Education.findByIdAndDelete(id);
        res.status(200).send({ msg: "Education removed successfully" })
    } catch (error) {
        res.status(400).send({ error: error })
    }
};


// Add new education details
const addNewEducation = async (req, res) => {

    try {
        const newEducation = new Education(req.body);
        await newEducation.save();
        res.status(200).send({ msg: "New Education Added Successfully" });
    } catch (error) {
        res.status(400).send({ error: error })
    }
}


//update the about data
const updateAboutData = async (req, res) => {
    try {
        const { description,image } = req.body;

        const updatedData = await About.findOneAndUpdate(
            {},
            { description, image },
            { new: true }
        );

        if (!updatedData) {
            res.status(404).send({ error: "Data Not Found!" })
        };
        res.status(200).send(updatedData);
    } catch (error) {
        res.status(500).send({ error: error })
    };
};

//update the intro data
const updateIntroData = async (req, res) => {
    const { welcomeText, name, caption,resume } = req.body;
    
    try {
        const updateData = await Intro.findOneAndUpdate(
            {},// Empty object finds the first document
            { welcomeText, name, caption,resume},// The fields to update
            { new: true } // Returns the updated document
        )

        if (!updateData) {
            res.status(404).send({ message: "Data Not Found!" })
        }
        res.status(200).send(updateData);
    } catch (error) {
        res.status(500).send("Failed to update data");
    }
}

// Get portfolio data
const getPortfolioData = (async (req, res) => {
    try {

        const intros = await Intro.find();         //Intro.find(): Fetches all documents from the Intro collection.
        const abouts = await About.find();        //About.find(): Fetches all documents from the About collection.
        const educations = await Education.find(); //The await keyword ensures that each query completes before moving to the next one
        const techStacks = await TechStack.find();

        const projects = await Project.find();
        const contacts = await Contact.find();

        res.status(200).send({ //Response handling
            intro: intros[0],   //intro: The first document from the Intro collection.
            about: abouts[0],   //about: The first document from the about collection.
            education: educations, //education: All documents from the Education collection.
            techStack: techStacks,
            project: projects,
            contact: contacts[0]
        })
    } catch (error) {
        res.status(500).send(error);
    }
});


// Email sender controller

const nodemailer = require('nodemailer');
const { param } = require("../routes/portfolioRoute");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        res.status(200).send({ msg: "Please fill all fields" })
    };

    const mailOptions = {
        from: email,
        to: process.env.SMTP_EMAIL,
        replyTo: email,
        subject: `Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            res.status(201).send({ msg: "Email Sent Successfully" });
        }
    })
});


module.exports = {
    sendEmail,
    getPortfolioData,
    updateIntroData,
    updateAboutData,
    addNewEducation,
    removeEducation,
    getEducation,
    updateEducation,
    updateSkills,
    getSkills,
    removeSkill,
    addNewSkill,
    getProject,
    updateProject,
    addNewProject,
    removeProject,
    adminLogin,
    addNewUser
};