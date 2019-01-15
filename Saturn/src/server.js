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
const dblogger  = CONFIG.dblogger;
const MongoClient 	= require('mongodb').MongoClient;
server.use(express.json());
server.use(express.urlencoded({extended:true}));


var privateKey  = fs.readFileSync('./certs/server.key');
var certificate = fs.readFileSync('./certs/server.crt');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, server);

// Redirect all the requests to app
server.all('*', app);

// Connect to database
var dbUrl = CONFIG.db_url;
dblogger.debug('Database URL : %s',dbUrl);
//------------------------------------------------------------------------------
//	Setting up the connection with Database
//------------------------------------------------------------------------------
MongoClient.connect(dbUrl,{ useNewUrlParser: true }, function(err, db) {                            
    if(err)
    {
    	logger.error('Error : %o',err);
      	throw err;
    }
    CONFIG.db = db.db(CONFIG.db_name);
    
    dblogger.debug('DB Connection object : %o',CONFIG.db);
    logger.info('Connected to database');
    logger.info('Starting HTTPS server');
    httpsServer.listen(CONFIG.port,()=>{
        logger.info('HTTPS server listening at port : %s',CONFIG.port);
    });
});

/*httpsServer.listen(CONFIG.port,()=>{
	logger.info('HTTPS server listening at port : %s',CONFIG.port);
});*/  // Server running at port = process.env.PORT