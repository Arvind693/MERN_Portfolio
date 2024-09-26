const mongoose = require('mongoose');
const { type } = require('os');

const introSchema = new mongoose.Schema({
    welcomeText: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    caption: {
        type: Array,
        required: true
    },
    resume: {
        type: String,
        required: true
    }
});

const aboutSchema = new mongoose.Schema({
    image:{
        type:String
    },
    description: {
        type: String,
        required: true
    }
});

const educationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    }
});

const techStackSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    icon:{
        type:String,
        required:true
    }
});


const projectsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: Array,
        required: true
    },
    liveLink: {
        type: String,
        required: true
    },
    codeLink: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required:true
    }
});

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});



module.exports = {
    Intro: mongoose.model("intros", introSchema),
    About: mongoose.model("abouts", aboutSchema),
    Education: mongoose.model("education",educationSchema),
    TechStack: mongoose.model("techstacks",techStackSchema),
    Project: mongoose.model("projects", projectsSchema),
    Contact: mongoose.model("contacts", contactSchema),
    User : mongoose.model("users",userSchema)
}