/*
    Filename    : sip.middleware.js
    Description :
*/
//------------------------------------------------------------------------------
require('magic-globals');
const CONFIG = require('../config/config');
const logger = CONFIG.logger;
const SIP    = CONFIG.SIP;
const stack  = {};

stack.makeCall = function(source,destination,callback){
    logger.info("[%s] , stack.makeCall",__file);
    let REGISTER = {};

}

module.exports = stack;