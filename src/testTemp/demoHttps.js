/*const express = require('express')
const fs = require('fs');
const https = require('https');

var httpsOptions = {
    key: fs.readFileSync('../certs/server.key')
      , cert: fs.readFileSync('../certs/server.crt')
}

const appHttp = express.createServer();
const appHttps = express.createServer(httpsOptions);

appHttp.get('/',function(req,res){
  res.send('HTTP GET PORT : 8000');
});

appHttps.get('/',function(req,res){
  res.send('HTTPS GET PORT : 8443');
});
appHttp.listen(8000);
appHttps.listen(8443);
*/
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
