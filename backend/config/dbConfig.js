
const mongoose = require('mongoose');
const { log } = require('util');
require('dotenv').config(); // Ensure environment variables are loaded

const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully 🥰');
  } catch (error) {
    console.log("MONGO URL",process.env.MONGO_URL);
    console.error('Error connecting to database:', error.message);
    process.exit(1); // Exit process with failure if connection fails
  }
};

module.exports = connectDB;
