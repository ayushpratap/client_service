const winston = require('../middleware/winston');
winston.info('File : call.controller.js');
var callController = {};
callController.makeCall = function (numberType,callNumber) {
	winston.info('makeCall');
	winston.info('numberType = ',numberType);
	winston.info('callNumber = ',callNumber);
	if(numberType == 'extn'){
		return 1;
	}
	else if(numberType == 'phone'){
		return 2;
	}
	else{
		return 0;
	}
}
module.exports = callController;
