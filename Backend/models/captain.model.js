const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [
                3, 'first name must be at least 3 characters'
            ]
        },
        lastname: {
            type: String,
            minlength: [
                3, 'last name must be at least 3 characters'
            ]
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'please enter a valid email ']
    },
    password: {
        type: String,
        required: true,
        select: false

    },
    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "color must be at least 3 character long "]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "plate number must be at least 3 character long "]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "capacity must be at least 1 passengers "]
        },

        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },

    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn:'24h'})
    return token;
}


captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}


const captainModel = mongoose.model('captains', captainSchema)

module.exports = captainModel;