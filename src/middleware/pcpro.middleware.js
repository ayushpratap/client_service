const MongoClient = require('mongodb').MongoClient;
const CONFIG = require('../config/config');
const winston = require('winston');
const pcpro = {};

pcpro.getUser = function(username,callback) {
  // Connect to database
  var test = {};
var res;
  var dbUrl = CONFIG.db_dialect+"://"+CONFIG.db_host+":"+CONFIG.db_port+"/";
  winston.info(dbUrl);
  var myJSONObject = {'Name':username};
  MongoClient.connect(dbUrl,{ useNewUrlParser: true }, function(err, db) {
    if(err){
      throw err;
    }
    var dbo = db.db(CONFIG.db_name);
	dbo.collection("users").findOne({"Name":username},function(err,result){
  if(err){ 
    throw err;
  }
  callback(JSON.stringify(result));
/*  test = {
  'Name' : result.Name,
  'Extension' : result.Extension,
  'Mobile Number' : result.Mobile_Number
};*/
	db.close();
	});
});
/*    winston.info(dbo);
    dbo.collection("users").find({"Name":myJSONObject.Name}).toArray(function(err, result) {
      if(err){ throw err};
      for (var i in result)
      {
          if(result[i].Extension!=null)
          {
          console.log(result[i].Extension);
          if(result[i].Mobile_Number!=null)
          {
          console.log(result[i].Mobile_Number);
          }
          }
          else if(result[i].Mobile_Number!=null)
          {
          console.log(result[i].Mobile_Number);
          }
      }*/
//      db.close();
/*      test = {
        'Name' : username,
        'Extension' : result[i].Extension,
        'Mobile_Number' : result[i].Mobile_Number
      };
*/
}
module.exports = pcpro;
