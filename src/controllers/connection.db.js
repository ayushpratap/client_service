const CONFIG = require('../config/config');
const MongoClient = require('mongodb').MongoClient;
var db_connections = {};

var dbUrl = CONFIG.db_dialect+"://"+CONFIG.db_host+":"+CONFIG.db_port+"/";
MongoClient.connect(dbUrl,{ useNewUrlParser: true }, function(err, db) {                            
    if(err)
    {
      throw err;
    }
    db_connections.alexa = db.db(CONFIG.db_name);
    db_connections.amazon_accounts = db.db(CONFIG.db_name_acc);
  });

module.exports = db_connections;
