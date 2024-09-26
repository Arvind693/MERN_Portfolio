const mongoose =require('mongoose');

mongoose.connect(process.env.mongo_url);

// create connection objects

const connection = mongoose.connection;

connection.on('error',()=>{
    console.log("Error Connecting to database");
});

connection.on("connected",()=>{
    console.log("Successfully connected to database"); 
});

module.exports = connection;