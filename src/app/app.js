/*
    Filename : app.js
    Description :
*/
// Require componenets
const express = require('express');
const morgan = require('morgan');
const winston = require('../middleware/winston');
const callController = require('../controllers/call.controller');
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('combined',{stream: winston.stream}));

winston.info('executing app.js');


//  Calling route
router.post('/api/makecall',function(req,res) {
  var numberType = req.body.numberType;
  winston.info('numberType = ',numberType);
  var callNumber = req.body.callNumber;
  winston.info('callNumber = ',callNumber);
  var result = callController.makeCall(numberType,callNumber);
  if(result)
  {
    res.send('Making call');
  }
  else
  {
    res.send('Error');
  }
});

router.post('/api/getuser',function(req,res) {
  // Extract variables
  var username = req.body.name;

  // Call pcrpo
  var result = userController.getuser(username);
  if(!result)
  {
    res.send('Could not fetch the user');
  }
  else
  {
    res.send(result);
  }
});
module.exports = router;
