/*
    Filename    : connection.db.js
    Description :
*/
//------------------------------------------------------------------------------
const CONFIG 		= require('../config/config');
const MongoClient 	= require('mongodb').MongoClient;
var db_connections 	= {};
const logger 		= CONFIG.logger;
//------------------------------------------------------------------------------

logger.info('Starting up the databse connection');

var dbUrl = CONFIG.db_url;
//var dbUrl = CONFIG.db_dialect+"://"+CONFIG.db_host+":"+CONFIG.db_port+"/";
logger.debug('Database URL : %s',dbUrl);

//------------------------------------------------------------------------------
//	Setting up the connection with Database
//------------------------------------------------------------------------------
MongoClient.connect(dbUrl,{ useNewUrlParser: true }, function(err, db) {                            
    if(err)
    {
    	logger.error('Error : %o',err);
      	throw err;
    }
    db_connections.alexa 			= db.db(CONFIG.db_name);
    db_connections.amazon_accounts 	= db.db(CONFIG.db_name_acc);
    logger.debug('DB Connection object : %o',db_connections);
    logger.info('Connected to database');
  });

//------------------------------------------------------------------------------
module.exports = db_connections;
