const express      = require('express');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const cors         = require('cors');
const jwt          = require('jsonwebtoken');
const mongoose     = require('mongoose');
const User         = require('./db/User');

const maxAge = 60 * 60 * 24 * 3;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    })
}


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/store').then(() => app.listen(5273));


//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: [
      'http://localhost:5173'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));


//Router
app.post('/register', async function(req, res) {
    const { name, lastName, password, email } = req.body;

    try {
        const user = new User({ name, lastName, password, email });
        await user.save();

        const token = createToken(user._id);
        
        res.cookie('jwt', token, { maxAge: maxAge*1000, httpOnly: true, secure: true });
        res.status(201).json(user);
    }
    catch(err) {
        const errors = errorHandler(err);
        res.status(400).json(errors);
    }

});

app.post('/login', async function(req, res) {

    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.cookie('jwt', token, { maxAge: maxAge*1000, httpOnly: true, secure: true });
        res.status(200).json(user);
    }
    catch(err) {
        const errors = errorHandler(err);
        res.status(403).json(errors);
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('jwt', '', { httpOnly: true, secure: true });
    res.send({ logout: 'ok '});
})



//Error handlers
function errorHandler(err) {
    const errors = {
        name: '',
        lastName: '',
        password: '',
        email: '',
    }

    //login errors
    if(err.message == 'Incorrect password') {
        errors.password = 'Specified password is incorrect';
        return errors;
    }
    if(err.message == 'Incorrect email') {
        errors.email = 'Email doesn\'t exist';
        return errors;
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






process.on('SIGTERM', stopHandler);
process.on('SIGINT', stopHandler);
process.on('SIGHUP', stopHandler);
async function stopHandler() {
  console.log('Stopping...');

  const timeoutId = setTimeout(() => {
    process.exit(1);
  }, 2000);

  try {
    await server.stop();
    clearTimeout(timeoutId);
  } catch (error) {
    console.error(error, 'Error during stop.');
    process.exit(1);
  }
}