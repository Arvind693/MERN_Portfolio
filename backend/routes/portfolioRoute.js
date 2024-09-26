const router = require("express").Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const {sendEmail, getPortfolioData, updateIntroData, updateAboutData, addNewEducation, removeEducation, getEducation, updateEducation, updateSkills, getSkills, removeSkill, addNewSkill, getProject, updateProject, addNewProject, removeProject, adminLogin, addNewUser} = require('../controllers/portfolioController');

router.post('/contact',sendEmail);
router.get('/get-portfolio-data',getPortfolioData);
router.put('/updateAboutData',updateAboutData);
router.post('/addNewEducation',addNewEducation);
router.delete('/removeEducation/:id',removeEducation);
router.get('/getEducation/:id',getEducation);
router.put('/updateEducation/:id',updateEducation);
router.get('/getSkills/:id',getSkills);
router.delete('/removeSkill/:id',removeSkill);
router.get('/getProject/:id',getProject)
router.delete('/removeProject/:id',removeProject);
router.post('/admin-login',adminLogin);
router.post('/addNewUser',addNewUser);

// Ensure the folder exists, and if not, create it
const uploadDir = path.join(__dirname, 'public/files');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// Configure multer for storing images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);  // Folder to store uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, `file_${Date.now()}${path.extname(file.originalname)}`); // Unique filename with timestamp
    }
});
const upload = multer({storage:storage});
router.put('/updateIntroData',upload.single('resume'),updateIntroData);


// Ensure the folder exists, and if not, create it
const iconsDir = path.join(__dirname, 'public/skillsIcons');

if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// multer for uploading Skills Icons 
const iconsStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,iconsDir)
    },
    filename:function(req,file,cb){
        cb(null,`file_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const uploadIcons = multer({storage:iconsStorage});
router.put('/updateSkills/:id',uploadIcons.single('icon'),updateSkills);
router.post('/addNewSkill',uploadIcons.single('icon'),addNewSkill)



// Ensure the folder exists, and if not, create it
const thumbnailDir = path.join(__dirname, 'public/projectsThumbnail');

if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir, { recursive: true });
}

// multer for uploading project thumbnails
const thumbStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,thumbnailDir)
    },
    filename:function(req,file,cb){
        cb(null,`file_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const uploadThumb = multer({storage:thumbStorage});
router.put('/updateProject/:id',uploadThumb.single('thumbnail'),updateProject);
router.post('/addNewProject',uploadThumb.single('thumbnail'),addNewProject);



module.exports=router;