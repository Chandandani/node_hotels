const mongoose = require('mongoose');
require('dotenv').config(); // To load environment variables from a .env file

// Define MongoDB connection URL from environment variables
//const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/hotel';

// Define MongoDB connection URL
//const mongoURL = 'mongodb://127.0.0.1:27017/hotel';
const mongoURL =process.env.MONGODB_URL;

// Setup MongoDB Connection
mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB Server!'))
    .catch((err) => {
        console.error('MongoDB Connection error:', err);
        process.exit(1); // Exit the process with failure
    });

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connection established successfully');
});

db.on('error', (err) => {
    console.error('MongoDB Connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
