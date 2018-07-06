var express = require('express');

var router = express.Router();

var getResponse = 'Please only make POST request to add data';

router.get('/',function(req,res){
    //  Get method should be disabled and should only return this string "Please only make POST request data"
    res.send(getResponse);
});

router.post('/',function(req,res){
    // Database
    // Parse the data sent in POST request
    res.send('POST handler for /create route');
});

module.exports = router;