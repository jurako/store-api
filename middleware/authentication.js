const cookieParser = require('cookie-parser');
const jwt          = require('jsonwebtoken');

module.exports = function(req, res, next) {
    console.log(req.cookies);
    console.log(process.env.SECRET);
    
    try {
        const userData = jwt.verify(req.cookies.jwt, process.env.SECRET);
        res.locals.userId = userData.id;
        next();
    } catch {
        res.status(401).send({ error: 'Unauthorized access' });
    }

}