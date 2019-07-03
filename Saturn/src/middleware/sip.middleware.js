/*
    Filename    : sip.middleware.js
    Description :
*/
//------------------------------------------------------------------------------
require('magic-globals');
const CONFIG                = require('../config/config');
const cryptoRand            = require('crypto-random-string');
const IP                    = require('ip');
const sip                   = require('sip');
const logger                = CONFIG.logger;
const stack                 = {};

stack.startStack = function(){
    logger.info("[%s] , stack.startStack",__file);
    let sip_port = CONFIG.sip_port;
    logger.info(sip_port);
    sip.start({protocol:'UDP',address:IP.address(),port:sip_port},(rs)=>{
        logger.info("[%s] , %o",__file,rs);
        
         switch(rs.method)
        {
            case 'NOTIFY':
                // Send 200OK

                sip.send(sip.makeResponse(rs, 200, 'Ok'));
                logger.info('CASE : NOTIFY');
                break;
            default:
                logger.info("%o",rs);
        }
        
    });
    register(sip);
}

register = function(sip){
    logger.info("[%s] , stack.register",__file);
    let domain      = CONFIG.sip_domain
    let localExnt   = CONFIG.sip_local_extn
    let transport   = CONFIG.sip_transport;
    let macAddr     = CONFIG.mac_addr;
    let MaxFowards  = CONFIG.max_forwards;
    let regisAddr   = CONFIG.sip_regis_addr;
    let name        = CONFIG.sip_local_name;
    let sip_port    = CONFIG.sip_port;
    let registerUri = 'sip:'+regisAddr;
    let from        = {name:name,uri:'sip:'+localExnt+'@'+domain,params:{tag:cryptoRand({length:10})}};
    let to          = {name:name,uri:'sip:'+localExnt+'@'+domain};
    let call_id     = cryptoRand({length:14})+"@"+domain;
    let cseq        = {method:'REGISTER',seq:cryptoRand({length:9,characters: '1234567890'})};
    let allow       = "INVITE, ACK, CANCEL, BYE, NOTIFY, REFER, OPTIONS, UPDATE";
    let contact     = [{name:name,uri:'sip:'+localExnt+'@'+IP.address()+':'+sip_port+';transport='+transport}];
    let expires     = 3600;
    let privacy     = "none";
    let UserAgent   = "NECSDT800_ITY-8LDX/4.3.18.14_"+macAddr;

    // Create the packet
    let REGISTER = {
        method:'REGISTER',
        uri:registerUri,
        headers:{
            via:[],
            'Max-Forwards':MaxFowards,
            from:from,
            to:to,
            'call-id':call_id,
            cseq:cseq,
            'Allow':allow,
            contact:contact,
            'Expires':expires,
            'Privacy':privacy,
            'User-Agent':UserAgent
        }
    };
    sip.send(REGISTER,(rs)=>{
        switch(rs.status)
        {
            case 200:
                logger.info("[%s] , status = [%d]",__file,rs.status);

                //  After receving 200OK now send 
                break;
            default:
                logger.info("[%s] , default case , status = [%d]",__file,rs.status);
                sip.send(REGISTER);
                break;
        }
    });
}
stack.makeCall = function(source,destination,callback){
    logger.info("[%s] , stack.makeCall",__file);
}

module.exports = stack;