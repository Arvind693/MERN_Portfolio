const express = require('express');
const app =express();
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const dbConfig=require("./config/dbConfig");
const portfolioRoute=require('./routes/portfolioRoute');
// const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false})); // middleware to parse the form data

app.use('/files', express.static(path.join(__dirname, 'routes/public/files')));
app.use('/skillsIcons', express.static(path.join(__dirname, 'routes/public/skillsIcons')));
app.use('/projectsThumbnail', express.static(path.join(__dirname, 'routes/public/projectsThumbnail')));

app.use("/api/portfolio",portfolioRoute);

app.use(express.static(path.join(__dirname,"../client/build")));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);  
});
