const winston = require('../middleware/winston');
const pcpro = require('../middleware/pcpro.middleware');
winston.info('File : call.controller.js');
var userController = {};
var result = 0;
userController.getUser = function (username) {
	var result = pcpro.getUser(username);
  if(result == NULL)
  {
    result = 0;
  }
  return result;
}
module.exports = userController;
