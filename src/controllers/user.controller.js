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
userController.getUserMulti=function(user1,user2,callback){
  console.log("///***///  2 ///***///");
  console.log("*******************************");
  console.log(user1);
  console.log(user2);
  console.log("*******************************");
  console.log("call pcpro.getUser");
  var resultBody = {};
  // Get user1
  pcpro.getUser(user1,function(result){
    if(null == result){
      resultBody.user1.Extension = null;
    }
    else{
      resultBody.user1.Extension = result.Extension;
    }
  });
  // Get user2
  pcpro.getUser(user2,function(result){
    if(null == result){
      resultBody.user2.Extension = null;
    }
    else{
      resultBody.user2.Extension = result.Extension;
    }
  });
  console.log(resultBody);
  callback(JSON.stringify(resultBody));
}
module.exports = userController;
