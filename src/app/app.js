/*
    Filename : app.js
    Description :
*/
// Require componenets
const express = require('express');
const morgan = require('morgan');
const winston = require('../middleware/winston');
const callController = require('../controllers/call.controller');
const userController = require('../controllers/user.controller');
//const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
//app.use(bodyParser.urlencoded({extended: true}));
//router.use(express.json());
//router.use(express.urlencoded({extended:true}));
app.use(morgan('combined',{stream: winston.stream}));
winston.info('executing app.js');

router.get('/',function(req,res) {
  res.send("Hello");
//  console.log("Hello");
});

//  Calling route
router.post('/api/makeCall',function(req,res) {
  var numberType = req.body.numberType;
  winston.info('numberType = ',numberType);
  var callNumber = req.body.callNumber;
  winston.info('callNumber = ',callNumber);
  var userId = req.body.userId;
  winston.info('userId = ',userId);
 callController.makeCall(numberType,callNumber,userId,function(result)
 {
  if(result==1)
  {
    winston.info("Making call");
    res.send('Making call');
  }
  else
  {
    winston.info("Unable to make call because something went wrong");
    res.send('Error');    
  }
});
});

router.post('/api/getUser',function(req,res) {
  // Extract variables
  var username = req.body.username;
  // Call pcrpo
  userController.getUser(username,function(result){
    if(result == null)
  {
    res.send('Could not fetch the user');
  }
  else
  {
    res.send(result);
  }
  });
});
module.exports = router;
