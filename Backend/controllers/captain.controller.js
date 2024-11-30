const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');

module.exports.registerCaptain = async (req, res, next) =>{
    console.log(req.body);
    
    const error = validationResult(req, res, next);
    console.log("error: " + error);
    
    
    if(!error.isEmpty()){
        return res.status(400).json(error.array());
    } 

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email})

    if(isCaptainAlreadyExist){
        return res.status(400).json({message: 'Captain already exist with this email'})
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

    res.status(201).json({token, captain});
}