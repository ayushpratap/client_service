const express = require('express')
const fs = require('fs');
const https = require('https');

var httpsOptions = {
    key: fs.readFileSync('path/to/key')
      , cert: fs.readFileSync('path/to/cert')
}

const appHttp = express.createServer();
const appHttps = express.createServer(httpsOptions);

appHttp.get('/',function(req,res){
  res.send('HTTP GET PORT : 8000');
});

appHttps.get('/',function(req,res){
  res.send('HTTPS GET PORT : 8443');
});
appHttp.listen(8000)
appHttps.listen(8443)
