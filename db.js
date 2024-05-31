const mongoose = require('mongoose');

// Define MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotel';

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
