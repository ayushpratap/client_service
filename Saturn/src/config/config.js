/*
	Filename: config.js
	Description:
 */
//------------------------------------------------------------------------------
require('dotenv').config();
const appRoot 								= require('app-root-path');
const winston 								= require('winston');
const fs 									= require('fs');
const path            						= require('path');
const LOG_DIR 								= appRoot+'/logs';
const ERROR_LOG_FILE						= LOG_DIR+'/'+'error.json';
const COMBINE_LOG_FILE						= LOG_DIR+'/'+'combine.json';
const DB_LOG_FILE 							= LOG_DIR+'/'+'db.json';
const SOCKET_LOG_FILE 						= LOG_DIR+'/'+'sockets.json';
const REQUEST_LOG_FILE 						= LOG_DIR+'/'+'request.json';
const TIMESTAMP_PATTERN						= 'DD-MM-YYYY HH:mm:ss';
let CONFIG 									= {};
//------------------------------------------------------------------------------
//	Create logs folder if does not exists
//------------------------------------------------------------------------------
console.log("''''''''''''''''''");
console.log(LOG_DIR);
console.log("''''''''''''''''''");
if(!fs.existsSync(LOG_DIR))
{
	fs.mkdirSync(LOG_DIR);
}
//------------------------------------------------------------------------------
//	Add parameters to global CONFIG
//------------------------------------------------------------------------------
CONFIG.app 				= process.env.APP 				|| 	'dev';
CONFIG.port_unsecured 	= process.env.PORT_UNSECURED 	|| 	'8000';
CONFIG.port 			= process.env.PORT 				|| 	'8443';
CONFIG.oai_ip 			= process.env.OAI_IP 			|| 	'10.0.97.243';
CONFIG.oai_port 		= process.env.OAI_PORT 			|| 	'60030';
CONFIG.db_dialect 		= process.env.DB_DIALECT 		|| 	'mongodb';
CONFIG.db_host 			= process.env.DB_HOST 			|| 	'localhost';
CONFIG.db_port 			= process.env.DB_PORT 			|| 	'27017';
CONFIG.db_url 			= process.env.DB_URL 			||	'mongodb://34.199.158.57:27017';
CONFIG.db_name 			= process.env.DB_NAME 			|| 	'Alexa';
CONFIG.db_name_acc 		= process.env.DB_NAME_ACC 		|| 	'amazon_accounts';
CONFIG.env 				= process.env.ENV				|| 	'dev';
//------------------------------------------------------------------------------
// Create logger for logging with two file transports
//------------------------------------------------------------------------------
const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.label({label : path.basename(module.parent.filename)}),
		winston.format.timestamp({format: TIMESTAMP_PATTERN}),
	),
	transports:[
		new winston.transports.File({
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.printf(
					info => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`,
					debug => `${debug.timestamp} ${debug.level} [${debug.label}] : ${debug.message}`,
					error => `${error.timestamp} ${error.level} [${error.label}] : ${error.message}`
				)
			),
			filename: COMBINE_LOG_FILE,
			level: 'silly'
		})
	]
});

const errlogger = winston.createLogger({
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.label({label : path.basename(module.parent.filename)}),
		winston.format.timestamp({format: TIMESTAMP_PATTERN})
	),
	transports:[
		new winston.transports.File({
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.printf(
					error => `${error.timestamp} ${error.level} [${error.label}] : ${error.message}`
				)
			),
			filename: ERROR_LOG_FILE,
			level: 'error'
		})
	]
});

const socklogger = winston.createLogger({
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.label({label : path.basename(module.parent.filename)}),
		winston.format.timestamp({format: TIMESTAMP_PATTERN})
	),
	transports:[
		new winston.transports.File({
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.printf(
					info => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`,
					debug => `${debug.timestamp} ${debug.level} [${debug.label}] : ${debug.message}`,
					error => `${error.timestamp} ${error.level} [${error.label}] : ${error.message}`
				)
			),
			filename: COMBINE_LOG_FILE,
			level: 'silly'
		}),
		new winston.transports.File({
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.printf(
					info => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`,
					debug => `${debug.timestamp} ${debug.level} [${debug.label}] : ${debug.message}`,
					error => `${error.timestamp} ${error.level} [${error.label}] : ${error.message}`
				)
			),
			filename: SOCKET_LOG_FILE,
			level: 'silly'
		})
	]
});

const reqlogger = winston.createLogger({
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.label({label : path.basename(module.parent.filename)}),
		winston.format.timestamp({format: TIMESTAMP_PATTERN})
	),
	transports:[
		new winston.transports.File({
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.printf(
					info => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`,
					debug => `${debug.timestamp} ${debug.level} [${debug.label}] : ${debug.message}`,
					error => `${error.timestamp} ${error.level} [${error.label}] : ${error.message}`
				)
			),
			filename: COMBINE_LOG_FILE,
			level: 'silly'
		}),
		new winston.transports.File({
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.printf(
					info => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`,
					debug => `${debug.timestamp} ${debug.level} [${debug.label}] : ${debug.message}`,
					error => `${error.timestamp} ${error.level} [${error.label}] : ${error.message}`
				)
			),
			filename: REQUEST_LOG_FILE,
			level: 'silly'
		})
	]
});

const dblogger = winston.createLogger({
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.label({label: path.basename(module.parent.filename)}),
		winston.format.timestamp({format: TIMESTAMP_PATTERN})
	),
	transports:[
		new winston.transports.File({
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.printf(
					info => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`,
					debug => `${debug.timestamp} ${debug.level} [${debug.label}] : ${debug.message}`,
					error => `${error.timestamp} ${error.level} [${error.label}] : ${error.message}`)
				),
			filename: COMBINE_LOG_FILE,
			level: 'silly'
		}),
		new winston.transports.File({
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.printf(
					info => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`,
					debug => `${debug.timestamp} ${debug.level} [${debug.label}] : ${debug.message}`,
					error => `${error.timestamp} ${error.level} [${error.label}] : ${error.message}`
				)
			),
			filename: DB_LOG_FILE,
			level: 'silly'
		})
	]
});

// If application is running in dvelopemnt environment then show logs to console
// else do not show logs on console
logger.add(new winston.transports.Console({
	level: CONFIG.env === 'dev' ? 'debug' : 'info',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.printf(
			info => `${info.level} [${info.label}] : ${info.message}`,
			debug => `${debug.level} [${debug.label}] : ${debug.message}`,
			error => `${error.level} [${error.label}] : ${error.message}`
		)
	)
}));

dblogger.add(new winston.transports.Console({
	level: CONFIG.env === 'dev' ? 'debug' : 'info',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.printf(
			info => `${info.level} [${info.label}] : ${info.message}`,
			debug => `${debug.level} [${debug.label}] : ${debug.message}`,
			error => `${error.level} [${error.label}] : ${error.message}`
		)
	)
}));

reqlogger.add(new winston.transports.Console({
	level: CONFIG.env === 'dev' ? 'debug' : 'info',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.printf(
			info => `${info.level} [${info.label}] : ${info.message}`,
			debug => `${debug.level} [${debug.label}] : ${debug.message}`,
			error => `${error.level} [${error.label}] : ${error.message}`
		)
	)
}));

socklogger.add(new winston.transports.Console({
	level: CONFIG.env === 'dev' ? 'debug' : 'info',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.printf(
			info => `${info.level} [${info.label}] : ${info.message}`,
			debug => `${debug.level} [${debug.label}] : ${debug.message}`,
			error => `${error.level} [${error.label}] : ${error.message}`
		)
	)
}));

errlogger.add(new winston.transports.Console({
	level: CONFIG.env === 'dev' ? 'error' : 'info',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.printf(
			info => `${info.level} [${info.label}] : ${info.message}`,
			debug => `${debug.level} [${debug.label}] : ${debug.message}`,
			error => `${error.level} [${error.label}] : ${error.message}`
		)
	)
}));
//------------------------------------------------------------------------------
// Add the logger instance to the global CONFIG
//------------------------------------------------------------------------------
CONFIG.logger 		= logger;
CONFIG.dblogger 	= dblogger;
CONFIG.reqlogger 	= reqlogger;
CONFIG.socklogger 	= socklogger;
CONFIG.errlogger 	= errlogger;
//------------------------------------------------------------------------------
module.exports = CONFIG;
