/*
    Filename : app.js
    Description : 
*/
// Require componenets
const express = require('express');
const morgan = require('morgan');
const winston = require('../middleware/winston');

const app = express();
const router = express.Router();
app.use(morgan('combined',{stream: winston.stream}));
winston.info('executing app.js');
router.get('/',function(req,res){
    res.send('Fuck world');
});

module.exports = router;
