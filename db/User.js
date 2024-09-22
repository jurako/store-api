const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
})

module.exports = mongoose.model('User', userSchema);