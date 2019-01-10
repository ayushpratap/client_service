/*
    Filename    : call.controller.js
    Description :
*/
//------------------------------------------------------------------------------
const oai 				= require('../middleware/oai.middleware');
const MongoClient 		= require('mongodb').MongoClient;
const db_connections 	= require('./connection.db');
const CONFIG 			= require('../config/config');
var callController 		= {};
var result 				= 0;
const logger 			= CONFIG.logger;
//------------------------------------------------------------------------------

logger.info('Starting up the call controller');

//------------------------------------------------------------------------------
//	Make single call
//------------------------------------------------------------------------------
//callController.makeCall = function (numberType,callNumber,userId,callback) 
callController.makeCall = function (source,destination,callback) 
{
	logger.info('Function execution start : callController.makeCall()');
	logger.debug('source : %s, destination : %s',source,destination);
	
	// Call the oai middleware
	logger.info('Calling OAI middleware');
	oai.makeCall(source,destination,function(result){
		logger.debug('Result object : %o',result);
		if(null == result)
		{
			logger.info('OAI middleware sends failure');
			result = null;
		}
		else
		{
			logger.info('OAI middleware sends success');
		}
		callback(result);
	});
}

//------------------------------------------------------------------------------
//	Make 3 party call
//------------------------------------------------------------------------------
//callController.makeCallMulti = function(stationB,stationC,userId,callbackMulti)
callController.makeCallMulti = function(source,destinationA,destinationB,callbackMulti)
{
	logger.info('Function execution start : callController.makeCallMulti()');
	logger.debug('source : %s, destinationA : %s, destinationB : %s',source,destinationA,destinationB);
	
	//	Call the oai middleware
	logger.info('Calling OAI middleware');
	oai.makeCallMulti(source,destinationA,destinationB,function(result){
		logger.debug('Result object : %o',result);
		if(null == result)
		{
			logger.info('OAI middleware sends failure');
			result = null;
		}
		else
		{
			logger.info('OAI middleware sends success');
		}
		callbackMulti(result);
	});
}

//------------------------------------------------------------------------------
module.exports = callController;