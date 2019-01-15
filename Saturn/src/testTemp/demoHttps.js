var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('../certs/server.key');
var certificate = fs.readFileSync('../certs/server.crt');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

app.get('/',function(req,res){
	res.send('HELLO WORLD');
});

httpServer.listen(8000);
console.log('HTTP server is running at port : 8000');
httpsServer.listen(8443);
console.log('HTTPS server is running at port : 8443');
