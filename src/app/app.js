/*
    Filename : app.js
    Description :
*/
// Require componenets
const express = require('express');
const morgan = require('morgan');
const winston = require('../middleware/winston');
const callController = require('../controllers/call.controller');

const app = express();
const router = express.Router();
app.use(morgan('combined',{stream: winston.stream}));
winston.info('executing app.js');


//  Calling route
router.post('/api/makecall',function(req,res) {
  winston.info(req.body);
  res.send('callController');
  /*var numberType = req.body.numberType;
  winston.info('numberType = ',numberType);
  var callNumber = req.body.callNumber;
  winston.info('callNumber = ',callNumber);
  var result = callController.makeCall(numberType,callNumber);
  if(!result)
  {
    res.send('Making call');
  }
  else
  {
    res.send('Error');
  }*/
});

module.exports = router;
