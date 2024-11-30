const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies?.token ||
        (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        req.captain = captain;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};