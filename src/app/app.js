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
const app = express();
const path = require('path');
const router = express.Router();
const expressHbs = require('express-handlebars');


app.use(morgan('combined',{stream: winston.stream}));
winston.info('executing app.js');

router.get('/',function(req,res) {
  res.send("Hello");
  console.log("Hello");
});

//  Calling route
router.post('/api/makeCall',function(req,res) 
{
  console.log(req.body);
  var source      = req.body.source;
  var destination = req.body.destination;
  callController.makeCall(source,destination,function(result){
    if(1 ==  result)
      res.send("/api/makeCall :  Making Call");
    else
      res.send("/api/makeCall :  Error");
  });
});

//-----------------------------------------------------------------------------
//  Make multi call
//-----------------------------------------------------------------------------
router.post('/api/makeCallMulti',function(req,res){
  console.log(req.body);
  var source = req.body.source;
  var destinationA = req.body.destinationA;
  var destinationB = req.body.destinationB;
  callController.makeCallMulti(source,destinationA,destinationB,function(result){
    if(1 == result)
      res.send('/api/makeCallMulti : Making 3 party call');
    else
      res.send('/api/makeCallMulti : Error');
  });
});

//-----------------------------------------------------------------------------
//  Get the multi call user information
//-----------------------------------------------------------------------------
router.post('/api/getUserMulti',function(req,res)
  {
    console.log("///***///  1 ///***///");
    console.log("POST REQUEST at /api/getUserMulti");
    var tmp1 = req.body.user1;
    var tmp2 = req.body.user2;
    var user1 = tmp1.toLowerCase();
    var user2 = tmp2.toLowerCase();
    console.log("*******************************");
    console.log(user1);
    console.log(user2);
    console.log("*******************************");
    userController.getUserMulti(user1,user2,function(result)
    {
        res.send(result);
    });
  }
);


//-----------------------------------------------------------------------------
//  Add user data to DB
//-----------------------------------------------------------------------------
router.post('/api/addUser',function(req,res)
{
  console.log("POST REQUEST at /api/addUser");
  console.log(req.body.Name);
  console.log(req.body.Extension);
  console.log(req.body.Mobile_Number);
  userController.addUser(req.body.Name,req.body.Extension,req.body.Mobile_Number,function(result){
    if(1 == result)
    {
      res.send("User added");
    }
    else
    {
      res.send("Something went wrong");
    }
  });
});

router.post('/api/getUser',function(req,res) 
{
  console.log("///***///  1 ///***///");
  // Extract variables
  console.log("*******************************");
  var tmp = req.body.username;
  var username = tmp.toLowerCase();
  console.log(username);
  console.log("*******************************");
  // Call pcrpo
  console.log("call userController.getUser");
  userController.getUser(username,function(result){
  if(result == null)
  {
    res.send('Could not fetch the user');
  }
  else
  {
    console.log("RESULT "+result);
    res.send(result);
  }
  });
});
module.exports = router;
