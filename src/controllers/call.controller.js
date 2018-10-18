const winston = require('../middleware/winston');
const oai = require('../middleware/oai.middleware');
const MongoClient = require('mongodb').MongoClient;
const db_connections = require('./connection.db');
//winston.info('File : call.controller.js');
var callController = {};
var result = 0;
callController.makeCall = function (numberType,callNumber,userId,callback) 
{
	console.log("///***///  5 ///***///");
	console.log("------------------------");
	console.log(numberType);
	console.log(callNumber);
	console.log(userId);
	console.log("------------------------");
	var sourceAddress = "";

	// Get the source address from the database
	getSourceAddress(userId,function(addr)
	{
		console.log("///***///  7 ///***///");
		if(addr == 0)
		{
			winston.error(addr);
			callback(null);
			return;
		}
		else
		{
			winston.info(addr);
			oai.makeCall(numberType,callNumber,addr,function(result)
			{
					var dbo = db_connections.amazon_accounts;
					var myquery = { "_userId": userId };
					var newvalues = { $set: {"is_available": 1} };
					console.log("Update DB");
					dbo.collection("account_mapping").updateOne(myquery, newvalues, function(err, res) {
						if (err) throw err;
					});
				if(result == null)
				{
			  	result = null;
				}
				callback(result);
			});
		}
	});
}
function getSourceAddress(userId,sourceAddrCallback)
{
	console.log("///***///  6 ///***///");
		var dbo = db_connections.amazon_accounts;
		dbo.collection("account_mapping").findOne({"_userId":userId}, function(err, result) 
		{
			if (err) throw err;

			console.log("--------- SOURCE ADDRESS -------------");
			console.log(result.source_extension);
			console.log("--------------------------------------");
			sourceAddrCallback(result.source_extension);
		});
}
callController.makeCallMulti = function(stationB,stationC,userId,callbackMulti)
{
	console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");
	console.log(stationB);
	console.log(stationC);
	console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");
	getSourceAddress(userId,function(addr)
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
					var newvalues = { $set: {"is_available": 1} };
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
		});
}
module.exports = callController;