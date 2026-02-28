// Import the Express library
const mongoose = require('mongoose');
const app = require("./app.js")

// Define port for the server to listen on
const PORT = 5000;

// Connect to MongoDB
mongoose.connect(
    REMOVED_MONGODB_URI
)
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

