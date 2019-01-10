/*
    Filename    : server.js
    Description : The purpose of this file is to start the server at
                process.env.PORT
*/
// Require componenets
const express 	= require('express');
const app 		= require('./app/app');
const CONFIG 	= require('./config/config');
const https 	= require('https');
const http 		= require('http');
const fs 		= require('fs');
const server 	= express(); // Get an instace of express
const logger 	= CONFIG.logger;
server.use(express.json());
server.use(express.urlencoded({extended:true}));


var privateKey  = fs.readFileSync('./certs/server.key');
var certificate = fs.readFileSync('./certs/server.crt');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, server);


server.all('*', app); // Redirect all the requests to app
httpsServer.listen(CONFIG.port,()=>{
	logger.info('HTTPS server listening at port : ',CONFIG.port);
});  // Server running at port = process.env.PORT