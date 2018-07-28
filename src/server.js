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
const server = express(); // Get an instace of express
const fs = require('fs');

const privateKey  = fs.readFileSync('./certs/server.key');
const certificate = fs.readFileSync('./certs/server.crt');
const credentials = {key: privateKey, cert: certificate};
const httpsServer = https.createServer(credentials, app);

winston.info('Starting server at port :' + CONFIG.port);
server.all('/', app); // Redirect all the requests to app
httpsServer.listen(CONFIG.port);  // Server running at port = process.env.PORT
// server.listen(CONFIG.port); // Server running at port = process.env.PORT
winston.info('Server running at port :' + CONFIG.port);
