/*
    Filename : app.js
    Description :
*/
// Require componenets
console.log('---------------------------------------------------------------------------------');
console.log('---------------------------------- APP ------------------------------------------');
console.log('---------------------------------------------------------------------------------');
const express = require('express');
const morgan = require('morgan');
const winston = require('../middleware/winston');
const callController = require('../controllers/call.controller');
const userController = require('../controllers/user.controller');
const app = express();
const path = require('path');
const router = express.Router();
const expressHbs = require('express-handlebars');
//app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', '.hbs');


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
  //console.log("///***///  4 ///***///");
  //var numberType = req.body.numberType;
  //console.log("++++++++++++++++++++++++++++++++++++");
  //console.log(numberType);
  //winston.info('numberType = ',numberType);
  //var callNumber = req.body.CallNumber;
  //console.log(callNumber);
  //winston.info('callNumber = ',callNumber);
  //var userId = req.body.userId;
  //console.log(userId);
  //console.log("++++++++++++++++++++++++++++++++++++");
  //winston.info('userId = ',userId);
  //console.log("call callController.makeCall");
  //callController.makeCall(numberType,callNumber,userId,function(result)
  //{
    //if(result==1)
    //{
      //winston.info("Making call");
      //res.send('Making call');
    //}
    //else
    //{
      //winston.info("Unable to make call because something went wrong");
      //res.send('Error');    
    //}
  //});
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
  /*console.log(req.body);
  console.log(req.body.stationB);
  console.log(req.body.stationC);
  console.log(req.body.userId);
  //console.log(req.body);
  callController.makeCallMulti(req.body.stationB,req.body.stationC,req.body.userId,function(result){
    if(result == 1)
    {
     res.send('Making call'); 
    }
    else
    {
     res.send('Error');  
    }
  });*/
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
//  Add user endpoint
//-----------------------------------------------------------------------------



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
