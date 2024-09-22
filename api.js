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
    const { name, surname } = req.body;
    const user = new User({ name, surname });
    await user.save();

    res.json(user);
});