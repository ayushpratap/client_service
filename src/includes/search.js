var express = require('express');

var router = express.Router();

router.get('/',function(req,res){
	res.send('GET handler for /search route.');
});

router.post('/',function(req,res){
	res.send('POST handler for /search route');
});

module.exports = router;
