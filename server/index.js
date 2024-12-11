// Importing the Express library, which provides tools for building the backend server
const express = require('express');

// Importing the CORS middleware to handle cross-origin requests
const cors = require('cors');

// Importing Mongoose, an ODM (Object Data Modeling) library for MongoDB
const mongoose = require('mongoose');

// Importing the API routes module that defines the backend endpoints
const apiRoutes = require('./routes/api'); 

// Initializing the Express application
const app = express();

// Defining the port number where the server will run
const PORT = 8080;

// Middleware configuration

// Using CORS middleware to enable cross-origin requests
app.use(cors());

// Using the Express JSON parser to parse incoming JSON request bodies
app.use(express.json());

// MongoDB connection setup

// Connecting to the MongoDB database using Mongoose
mongoose
    .connect('mongodb://localhost:27017/autism_support_platform', { // Database connection string
        useNewUrlParser: true, // Use the new MongoDB connection string parser
        useUnifiedTopology: true, // Use the new topology engine for handling connections
    })
    .then(() => console.log('Connected to MongoDB')) // Log a success message if the connection is successful
    .catch((err) => console.error('MongoDB connection error:', err)); // Log an error message if the connection fails

// Routes

// Using the API routes defined in the `apiRoutes` module for all endpoints starting with '/api'
app.use('/api', apiRoutes);

// Base route to test if the backend is running
// This responds with a simple message when a GET request is made to the root URL ('/')
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Starting the server and listening for requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log a message when the server starts
});
