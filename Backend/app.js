const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDB = require('./db/db.js');
const userRoutes = require('./routes/user.routes.js');

// Connect to the database
connectToDB();

// Middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.use('/users', userRoutes); // User routes are prefixed with '/users'

// Error handling middleware (optional, for catching all errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Export the app
module.exports = app;
