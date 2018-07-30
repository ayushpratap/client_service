const winston = require('../middleware/winston');
const pcpro = require('../middleware/pcpro.middleware');
winston.info('File : call.controller.js');
var userController = {};
userController.getUser=function (username) {
  var result = pcpro.getUser(username);
    console.log(result+"Hello");
  if(result == null)
  {
    result = null;
  }
  return result;
}
module.exports = userController;
