const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4  // Force IPv4
    });
    
    // Add event listeners for connection
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error details:`, error);
    process.exit(1);
  }
};

module.exports = connectDB;
