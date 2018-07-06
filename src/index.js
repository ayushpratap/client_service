var express = require('express'),
	search = require('./includes/search'),
	call = require('./includes/call');

var app = express();
var port = 8000;
app.use('/search',search);
app.use('/call',call);

app.listen(port);
console.log('Server running at port '+port);
