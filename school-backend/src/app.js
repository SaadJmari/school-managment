const express = require('express');
const studentsRouter = require('./features/students/student.routes.js');

// Create an Express application
const app = express();

app.use(express.json());


// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, school backend is running!');
});

// Add students routes
app.use('/students', studentsRouter);

//Handling errors
app.use((err, req, res, next) => {
    console.error(err);

    //To not leak error status
    const status = err.status || 500;
    const message = status >= 500 ? "Internal Server Error" : err.message;

    return res.status(err.status || 500).json({ error: message});
})

module.exports = app;