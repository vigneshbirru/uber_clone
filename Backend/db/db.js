const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => console.error("Database connection error:", err));
}

module.exports = connectToDB;
