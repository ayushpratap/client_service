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
	//winston.info('makeCall');
	/*winston.info('numberType = ',numberType);
	winston.info('callNumber = ',callNumber);
	winston.info('userId = ',userId);*/
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
		//winston.info("Source address is ");
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
				//	Remove mapping from DB
				//var url = "mongodb://127.0.0.1:27017/";
				//MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
					//if (err) throw err;
					var dbo = db_connections.amazon_accounts;
					var myquery = { "_userId": userId };
					var newvalues = { $set: {"is_available": 1} };
					console.log("Update DB");
					dbo.collection("account_mapping").updateOne(myquery, newvalues, function(err, res) {
						if (err) throw err;
						//console.log("");
						//db.close();
					});
				//});
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
	//console.log(userId);
	//var url = "mongodb://localhost:27017/";
	//MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
		//if (err) throw err;
		var dbo = db_connections.amazon_accounts;
		dbo.collection("account_mapping").findOne({"_userId":userId}, function(err, result) 
		{
			if (err) throw err;
		//	db.close();
			console.log("--------- SOURCE ADDRESS -------------");
			console.log(result.source_extension);
			console.log("--------------------------------------");
			sourceAddrCallback(result.source_extension);
		});
	//});
}
module.exports = callController;