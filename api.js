const http = require('http');
const { MongoClient } = require('mongodb');


console.log('mongodb', MongoClient);

http.createServer(function(req, res) {
    const { url, method } = req;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'json/application;charset=utf-8');
    
    res.end();
}).listen(5273);