const winston = require('../middleware/winston');
const oai = require('../middleware/oai.middleware');
//winston.info('File : call.controller.js');
var callController = {};
var result = 0;
callController.makeCall = function (numberType,callNumber,callback) {
	winston.info('makeCall');
	winston.info('numberType = ',numberType);
	winston.info('callNumber = ',callNumber);
	oai.makeCall(numberType,callNumber,function(result){
		console.log(result+"hello1");
		if(result == null)
		{
		  result = null;
		}
		callback(result);
	  });
//	return result;
}
module.exports = callController;
