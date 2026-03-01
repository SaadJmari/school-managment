// Import the Express library
const mongoose = require('mongoose');
const app = require("./app.js");
require("dotenv").config();

// Define port for the server to listen on
const PORT = 5000;

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables");
}


mongoose.connect(MONGODB_URI)
.then(()=> {
    console.log('Connected to MongoDB Atlas');
    // Make the server listen on the port
    app.listen(PORT, ()=> {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
})
.catch((error) => {
    console.error('MongoDB connection error: ', error);
})

