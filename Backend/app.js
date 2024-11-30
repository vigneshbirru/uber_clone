const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectToDB = require('./db/db.js');
const userRoutes = require('./routes/user.routes.js');
const captainerRouters = require('./routes/captain.routes.js');

// Connect to the database
connectToDB();

// Middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

// Define routes
app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.use('/users', userRoutes); // User routes are prefixed with '/users'
app.use('/captains',captainerRouters)


// Export the app
module.exports = app;
