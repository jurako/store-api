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
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw new Error('Incorrect password');
    }

    throw new Error('Incorrect email');
}

module.exports = mongoose.model('User', userSchema);