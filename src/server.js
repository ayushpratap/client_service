/*
    Filename    : server.js
    Description : The purpose of this file is to start the server at
                process.env.PORT
*/
// require componenets
const express = require('express');
const app = require('./app/app');
const CONFIG = require('./config/config');
const winston = require('./middleware/winston');
const https = require('https');
const http = require('http');
const fs = require('fs');
const server = express(); // Get an instace of express

var privateKey  = fs.readFileSync('./certs/server.key');
var certificate = fs.readFileSync('./certs/server.crt');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, server);

winston.info('Starting server at port :' + CONFIG.port);
server.all('/', app); // Redirect all the requests to app
httpsServer.listen(CONFIG.port);  // Server running at port = process.env.PORT
winston.info('Server running at port :' + CONFIG.port);
