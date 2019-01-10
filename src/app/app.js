/*
    Filename    : app.js
    Description :
*/
//----------------------------------------------------------------------------
const express         = require('express');
const callController  = require('../controllers/call.controller');
const userController  = require('../controllers/user.controller');
const CONFIG          = require('../config/config');
const app             = express();
const path            = require('path');
const router          = express.Router();
const expressHbs      = require('express-handlebars');
const logger          = CONFIG.logger;
//----------------------------------------------------------------------------

logger.info('Starting up the App');

//----------------------------------------------------------------------------
//  Default route
//----------------------------------------------------------------------------
router.get('/',function(req,res) {
  logger.info("Request received at router.get('/')");
  logger.debug('Request object : %o',req);
  logger.info('Send the HTTPS request response : Hello');
  
  // Send the HTTPS request response
  res.send("Hello");
});


//----------------------------------------------------------------------------
//  Make single call
//----------------------------------------------------------------------------
router.post('/api/makeCall',function(req,res) 
{
  logger.info("Request received at router.post('/api/makeCall')");
  logger.debug('Request object : %o',req);
  var source      = req.body.source;
  var destination = req.body.destination;
  logger.info('Calling : callController.makeCall with source : %s , destination : %s',source,destination);
  callController.makeCall(source,destination,function(result)
  {
    if(1 ==  result)
    {
      logger.debug('Result object : %o',result);
      logger.info('Sending response for HTTPS request => /api/makeCall :  Making Call');

      // Send the HTTPS request response
      res.send("/api/makeCall :  Making Call");
    }
    else
    {
      logger.debug('Result object : %o',result);
      logger.info('Sending response for HTTPS request => /api/makeCall :  Error');

      // Send the HTTPS request response
      res.send("/api/makeCall :  Error");
    }
  });
});

//----------------------------------------------------------------------------
//  Make 3 party call
//----------------------------------------------------------------------------
router.post('/api/makeCallMulti',function(req,res){
  logger.info("Request received at router.post('/api/makeCallMulti')");
  logger.debug('Request object : %o',req);

  var source        = req.body.source;
  var destinationA  = req.body.destinationA;
  var destinationB  = req.body.destinationB;

  logger.info('Calling : callController.makeCall with source : %s , destinationA : %s , destinationB : %s',source,destinationA,destinationB);
  callController.makeCallMulti(source,destinationA,destinationB,function(result){
    if(1 == result)
    {
      logger.debug('Result object : %o',result);
      logger.info('Sending response for HTTPS request => /api/makeCallMulti : Making 3 party call');

      //  Send the HTTPS request response
      res.send('/api/makeCallMulti : Making 3 party call');
    }
    else
    {
      logger.debug('Result object : %o',result);
      logger.info('Sending response for HTTPS request => /api/makeCallMulti :  Error');

      //  Send the HTTPS request response
      res.send('/api/makeCallMulti : Error');
    }
  });
});

//----------------------------------------------------------------------------
module.exports = router;