const winston = require('../middleware/winston');
const pcpro = require('../middleware/pcpro.middleware');
const MongoClient = require('mongodb').MongoClient;
const db_connections = require('./connection.db');
winston.info('File : call.controller.js');
var userController = {};
userController.getUser=function (username,callback) {
  console.log("///***///  2 ///***///");
  console.log("username ="+username);
  console.log("call pcpro.getUser");
  pcpro.getUser(username,function(result){
    /*console.log("RESULT - 1 start");
    console.log(result);
    console.log("RESULT - 1 end");*/
    if(result == null)
    {
      result = null;
    }
    callback(result);
  });
}
userController.addUser=function(Name,Extension,Mobile_Number,callback){
  var dbo = db_connections.alexa;
  var dataObj = {
    "Name":Name,
    "Extension":Extension,
    "Mobile_Number":Mobile_Number
  };
  var result = 0;
  dbo.collection("users").insertOne(dataObj,function(err,res){
    if(err)
    { 
      throw err;
    }
    else
    {
      console.log("User added");
      result = 1;
    }
  });
  callback(result);
}
module.exports = userController;
