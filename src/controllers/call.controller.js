const winston = require('../middleware/winston');
const oai = require('../middleware/oai.middleware');
const MongoClient = require('mongodb').MongoClient;
//winston.info('File : call.controller.js');
var callController = {};
var result = 0;
callController.makeCall = function (numberType,callNumber,userId,callback) {
	winston.info('makeCall');
	winston.info('numberType = ',numberType);
	winston.info('callNumber = ',callNumber);
	winston.info('userId = ',userId);
	var sourceAddress = "";

	// Get the source address from the database

	var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("amazon_accounts");
		dbo.collection("account_mapping").findOne({"_userId":userId}, function(err, result) {
			if (err) throw err;
			sourceAddress = result.source_extension;
			db.close();
		});
	});
	if(0 == sourceAddress)
	{
		callback(null);
	}

	oai.makeCall(numberType,callNumber,sourceAddress,function(result){
	//	console.log(result+"hello1");
	//	Remove mapping from DB
	var url = "mongodb://127.0.0.1:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("amazon_accounts");
		var myquery = { "_userId": userId };
		var newvalues = { $set: {"is_available": 1,"source_extension";0} };
		dbo.collection("account_mapping").updateOne(myquery, newvalues, function(err, res) {
			if (err) throw err;
			console.log("1 document updated");
			db.close();
		});
	});
		if(result == null)
		{
		  result = null;
		}
		callback(result);
	  });
//	return result;
}
module.exports = callController;