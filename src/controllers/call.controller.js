var express = require('express');

var router = express.Router();
/*
router.get('/',function(req,res){
	res.send('GET handler for /call route');
});*/

router.post('/',function(req,res){
	res.send('POST handler for /call route');
});

module.exports = router;
