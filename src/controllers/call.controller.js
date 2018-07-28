const winston = require('../middleware/winston');
const oai = require('../middleware/oai.middleware');
winston.info('File : call.controller.js');
var callController = {};
var result = 0;
callController.makeCall = function (numberType,callNumber) {
	winston.info('makeCall');
	winston.info('numberType = ',numberType);
	winston.info('callNumber = ',callNumber);
	if(numberType == 'extn' || numberType == 'phone'){
		result = oai.makeCall(callNumber);
	}
	else{
		result = 0;
	}
	return result;
}
module.exports = callController;
