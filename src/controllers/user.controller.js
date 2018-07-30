const winston = require('../middleware/winston');
const pcpro = require('../middleware/pcpro.middleware');
winston.info('File : call.controller.js');
var userController = {};
userController.getUser=function (username,callback) {
  pcpro.getUser(username,function(result){
    console.log(result+"hello");
    if(result == null)
    {
      result = null;
    }
    callback(result);
  });
}
module.exports = userController;
