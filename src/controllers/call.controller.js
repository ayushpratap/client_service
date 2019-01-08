const winston = require('../middleware/winston');
const oai = require('../middleware/oai.middleware');
const MongoClient = require('mongodb').MongoClient;
const db_connections = require('./connection.db');
var callController = {};
var result = 0;

//callController.makeCall = function (numberType,callNumber,userId,callback) 
callController.makeCall = function (source,destination,callback) 
{
	console.log("callController.makeCall");
	console.log("source : " + source);
	console.log("destination : " + destination);
	oai.makeCall(source,destination,function(result){
		if(null == result)
			result = null;
		callback(result);
	});
}
//callController.makeCallMulti = function(stationB,stationC,userId,callbackMulti)
callController.makeCallMulti = function(source,destinationA,destinationB,callbackMulti)
{
	console.log("source 	  : " + source);
	console.log("destinationA : " + destinationA);
	console.log("destinationB : " + destinationB);
	oai.makeCallMulti(source,destinationA,destinationB,function(result){
		if(null == result)
			result = null;
		callbackMulti(result);
	});
	/*getSourceAddress(userId,function(addr)
		{
			if(addr == 0)
			{
				winston.error(addr);
				callbackMulti(null);
				return;
			}
			else
			{
				oai.makeCallMulti(addr,stationB,stationC,function(result){
					var dbo = db_connections.amazon_accounts;
					var myquery = { "_userId": userId };
					var newvalues = { $set: {"is_available": 1,"source_extension":0000} };
					console.log("Update DB");
					dbo.collection("account_mapping").updateOne(myquery, newvalues, function(err, res) {
						if (err) throw err;
					});
					if(result == null)
				{
			  	result = null;
				}
				callbackMulti(result);
				});
			}	
		});*/
}
module.exports = callController;