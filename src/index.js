var express = require('express'),
	search = require('./includes/search'),
	call = require('./includes/call');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var app = express();
var port = 8000;

var logStream = fs.createWriteStream(path.join(__dirname, 'log/logfile.log'),{flag: 'a'});

app.use(morgan('combined',{stream : logStream}));
app.use('/search',search);
app.use('/call',call);

app.listen(port);
console.log('Server running at port '+port);
