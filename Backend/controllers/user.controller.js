const { validationResult } = require('express-validator');
const userModel = require('../models/user.models');
const userService = require('../services/user.service');
const blackListTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlready = await userModel.findOne({ email });

    if(isUserAlready) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }



    const token = user.generateAuthToken();

    res.cookie('token', token)

    res.status(200).json({ token, user })

}

module.exports.getUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }

        // Return the authenticated user's profile
        res.status(200).json({
            message: 'User profile retrieved successfully',
            user: req.user
        });
    } catch (err) {
        console.error('Error retrieving user profile:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports.logoutUser = async (req, res, next) => {
    try {
        // Clear the cookie
        res.clearCookie('token');

        // Extract token from cookies or Authorization header
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
       

        // Check if the token is present
        if (!token) {
            return res.status(400).json({ message: 'Token not found' });
        }

        // Add the token to a blacklist (assuming you have a model for this)
        await blackListTokenModel.create({ token });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Error during logout:', err.message);
        res.status(500).json({ message: 'An error occurred during logout' });
    }
};

