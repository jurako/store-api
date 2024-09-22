const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    phone: String,
    address: String 
});

module.exports = mongoose.model('User', userSchema);