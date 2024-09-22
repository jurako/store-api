const http = require('http');
const mongoose = require('mongoose');
const User = require('./db/User');

mongoose.connect('mongodb://127.0.0.1:27017/store');

http.createServer(function(req, res) {
    const { url, method } = req;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    // console.log('url', url);
    // console.log('method', method);

    if(url == '/register' && method == 'POST') {

        let body= "";
        req.on("data", (chunk) => body += chunk );
        req.on("end", async function() {
            body = JSON.parse(body);

            const { name, surname } = body;
            const user = new User({ name, surname });
            await user.save();
            
            console.log('user', user);


            res.statusCode = 200;
            res.setHeader('Content-Type', 'json/application;charset=utf-8');
            res.write(JSON.stringify(user));
            res.end();
        });

        // console.log('From register');
        // console.log('name', name);
        // console.log('surname', surname);
        // const user = {

        // }
    }


}).listen(5273);