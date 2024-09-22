const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./db/User');


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/store').then(() => app.listen(5273));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', ['*']);
    next();
})


app.post('/register', async function(req, res) {
    const { name, surname, password, email } = req.body;

    try {
        const user = new User({ name, surname, password, email });
        await user.save();

        res.json(user);
    }
    catch(err) {
        const errors = errorHandler(err);
        res.status(400).json(errors);
    }

});

function errorHandler(err) {
    const errors = {
        name: '',
        surname: '',
        password: '',
        email: '',
    }

    //duplicate error
    if(err.code == 11000) {
        errors.email = 'Email already taken';
        return errors;
    }

    Object.values(err.errors).forEach(error => {
        const { path, message } = error.properties;
        errors[path] = message;
    });

    return errors;
}