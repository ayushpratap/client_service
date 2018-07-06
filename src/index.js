var express = require('express'),
	search = require('./includes/search'),
	call = require('./includes/call'),
    newRecord = require('./includes/create'),
    winston = require('./config/winston');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var app = express();
var port = 8000;



app.use(morgan('combined',{stream: winston.stream}));
app.use('/search',search);
app.use('/call',call);
app.use('/create',newRecord);

winston.info('Starting server at port :'+port);
app.listen(port);
winston.info('Server running at port :'+port);
