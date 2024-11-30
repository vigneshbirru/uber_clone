const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies?.token ||
        (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);
       
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    const isBlacklisted = await userModel.findOne({ token: token });

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

