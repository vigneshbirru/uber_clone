const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
 
module.exports.registerCaptain = async (req, res, next) => {
    console.log(req.body);

    const error = validationResult(req, res, next);
    console.log("error: " + error);


    if (!error.isEmpty()) {
        return res.status(400).json(error.array());
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email })

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist with this email' })
    }

    const hashPassword = await captainModel.hashPassword(password);
    console.log("Hashed Password: ", hashPassword);

    console.log({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const captain = await captainService.createCaptain(
        fullname.firstname,
        fullname.lastname,
        email,
        hashPassword,
        vehicle.color,
        vehicle.plate,
        vehicle.capacity,
        vehicle.vehicleType
    );


    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

// module.exports.loginCaptain = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     const captain = await captainModel.findOne({ email }).select(+password);

//     if (!captain) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await captain.comparePassword(password);

//     if (!isMatch) {
//         return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = captain.generateAuthToken();

//     res.cookie('token', token);

//     res.status(200).json({ token, captain })
// }
module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain || !(await captain.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (token) {
        await blacklistTokenModel.create({ token });
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } else {
        res.status(400).json({ message: 'No token provided' });
    }
};