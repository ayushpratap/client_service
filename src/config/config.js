/*
	Filename: config.js
	Description:
 */
//------------------------------------------------------------------------------
require('dotenv').config();
var appRoot 	= require('app-root-path');
const winston 	= require('winston');
let CONFIG 		= {};
//------------------------------------------------------------------------------
//	Add parameters to global CONFIG
//------------------------------------------------------------------------------
CONFIG.app 				= process.env.APP 				|| 'dev';
CONFIG.port_unsecured 	= process.env.PORT_UNSECURED 	|| '8000';
CONFIG.port 			= process.env.PORT 				|| '8443';
CONFIG.oai_ip 			= process.env.OAI_IP 			|| '10.0.97.243';
CONFIG.oai_port 		= process.env.OAI_PORT 			|| '60030';
CONFIG.db_dialect 		= process.env.DB_DIALECT 		|| 'mongodb';
CONFIG.db_host 			= process.env.DB_HOST 			|| 'localhost';
CONFIG.db_port 			= process.env.DB_PORT 			|| '27017';
CONFIG.db_name 			= process.env.DB_NAME 			|| 'Alexa';
CONFIG.db_name_acc 		= process.env.DB_NAME_ACC 		|| 'amazon_accounts';
CONFIG.db_user 			= process.env.DB_USER 			|| 'root';
CONFIG.db_password 		= process.env.DB_PASSWORD 		|| '';
CONFIG.jwt_encryption 	= process.env.JWT_ENCRYPTION 	|| 'LittleBitOFThisAndThat';
CONFIG.jwt_expiration 	= process.env.JWT_EXPIRATION 	|| '604800';
CONFIG.env 				= process.env.ENV				|| 'dev';
//------------------------------------------------------------------------------
// Create logger for logging
const logger = winston.createLogger({
		transports:[
		new winston.transports.File({
										format: winston.format.combine(
												winston.format.label({
														label: CONFIG.env
													}),												
												winston.format.timestamp({
													format: 'HH:mm:ss DD-YYYY-MM'
												}),
												winston.format.splat(),
												winston.format.json(),
												winston.format.prettyPrint(),
												winston.format.printf(error => `${info.timestamp} ${info.level}: ${info.message}`)
											),
										filename: appRoot+'/logs/error.log', 
										level: 'error'
									}),
		new winston.transports.File({
										format: winston.format.combine(
												winston.format.label({
														label: CONFIG.env
													}),
												winston.format.timestamp({
													format: 'HH:mm:ss DD-YYYY-MM'
												}),
												winston.format.splat(),
												winston.format.json(),
												winston.format.prettyPrint(),
												winston.format.printf(
													info => `${info.timestamp} ${info.level}: ${info.message}`,
													debug => `${info.timestamp} ${info.level}: ${info.message}`,
													error => `${info.timestamp} ${info.level}: ${info.message}`)
											),										
										filename: appRoot+'/logs/combined.log',
										level: 'silly'
									})
	]
});

// If application is running in dvelopemnt environment then show logs to console
// else do not show logs on console
if(process.env.ENV === 'prod'){
	logger.add(new winston.transports.Console({
		format: winston.format.combine(
				winston.format.colorize(),
				winston.format.splat(),
				winston.format.simple()
			),
		level: 'info'
	}));
}

if(process.env.ENV === 'dev'){
	logger.add(new winston.transports.Console({
		format: winston.format.combine(
				winston.format.colorize(),
				winston.format.splat(),
				winston.format.simple()
			),
		level: 'silly'
	}));
}
//------------------------------------------------------------------------------
// Add the logger instance to the global CONFIG
//------------------------------------------------------------------------------
CONFIG.logger = logger;
//------------------------------------------------------------------------------
module.exports = CONFIG;
