const mongoose = require('mongoose');
const validator = require('validator');
const { isEmail } = validator;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    surname: {
        type: String,
        required: [true, 'Please enter a surname']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter an email'],
        validate: [isEmail, 'Incorrect email format']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password is too short']
    },
    phone: String,
    address: String 
});

module.exports = mongoose.model('User', userSchema);