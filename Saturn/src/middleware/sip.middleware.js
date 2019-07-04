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
        //logger.info("[%s] , %o",__file,rs);
       // logger.info("[%s] , %o",__file,rs.method); 
        switch(rs.method)
        {
            case 'NOTIFY':
                // Send 200OK
                logger.info('[%s], CASE : NOTIFY ',__file);
                sip.send(logger.info('[%s], %o',__file,sip.makeResponse(rs,200,'OK')));
                
                break;
                case 'OPTIONS':
                logger.info('[%s], CASE : OPTIONS ',__file)
                sip.send(logger.info('[%s], %o',__file,sip.makeResponse(rs,200,'OK')));
                break;
            default:
                logger.info("%o",rs.method);
                break;
        }
    });
    register(sip);
}

register = function(sip){
    logger.info("[%s] , stack.register",__file);
    let domain      = CONFIG.sip_domain;
    let localExnt   = CONFIG.sip_local_extn;
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
    //let UserAgent   = "NECSDT700_ITL-12G/3.0.21.19_"+macAddr;
    let UserAgent   = "NECSDT800_ITY-8LDX/4.3.18.14_"+macAddr;
    let version     = "2.0";
    let via         = [{version:version,protocol:'UDP',host:IP.address(),port:sip_port,params:{branch:cryptoRand({length:16})}}];
    let content_length = 0;
    

    // Create the packet
    let REGISTER = {
        method  :   'REGISTER',
        uri     :   registerUri,
        version :   version,
        headers :   {
                via             :   via,
                from            :   from,
                to              :   to,
                cseq            :   cseq,
                contact         :   contact,
                'call-id'       :   call_id,
                'Max-Forwards'  :   MaxFowards,
                'Allow'         :   allow,
                'Expires'       :   expires,
                'Privacy'       :   privacy,
                'User-Agent'    :   UserAgent,
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

stack.referCall = function(source,destination,callback){
    logger.info("[%s] , stack.makeCall",__file);
    sip.start({protocol:'UDP',address:IP.address(),port:sip_port},(rs)=>{
        //logger.info("[%s] , %o",__file,rs);
        // logger.info("[%s] , %o",__file,rs.method); 
        switch(rs.method)
        {
            case 'NOTIFY':
                // Send 200OK
                logger.info('[%s], CASE : NOTIFY ',__file);
                sip.send(logger.info('[%s], %o',__file,sip.makeResponse(rs,200,'OK')));
                
                break;
                case 'OPTIONS':
                logger.info('[%s], CASE : OPTIONS ',__file)
                sip.send(logger.info('[%s], %o',__file,sip.makeResponse(rs,200,'OK')));
                
                break;
            default:
                logger.info("%o",rs.method);
        }
    });
    refer(sip,source,destination);
}

refer = function(sip,source,destination){
    logger.info("[%s] , stack.refer",__file);
    let domain      = CONFIG.sip_domain;
    let localExnt   = CONFIG.sip_local_extn;
    let transport   = CONFIG.sip_transport;
    let macAddr     = CONFIG.mac_addr;
    let MaxFowards  = CONFIG.max_forwards;
    let regisAddr   = CONFIG.sip_regis_addr;
    let name        = CONFIG.sip_local_name;
    let sip_port    = CONFIG.sip_port;
    let registerUri = 'sip:'+regisAddr;
    let from        = {name:name,uri:'sip:'+localExnt+'@'+domain,params:{tag:cryptoRand({length:10})}};
    let to          = {name:source,uri:'sip:'+source+'@'+domain,params:{gr:cryptoRand({length:9})}};
    let referTarget = {name:destination,uri:'sip:'+destination+'@'+domain};
    let call_id     = cryptoRand({length:14})+"@"+domain;
    let cseq        = {method:'REGISTER',seq:cryptoRand({length:9,characters: '1234567890'})};
    let allow       = "INVITE, ACK, CANCEL, BYE, NOTIFY, REFER, OPTIONS, UPDATE";
    let contact     = [{name:name,uri:'sip:'+localExnt+'@'+IP.address()+':'+sip_port+';transport='+transport}];
    let expires     = 3600;
    let privacy     = "none";
    //let UserAgent   = "NECSDT700_ITL-12G/3.0.21.19_"+macAddr;
    let UserAgent   = "NECSDT800_ITY-8LDX/4.3.18.14_"+macAddr;
    let version     = "2.0";
    let via         = [{version:version,protocol:'UDP',host:IP.address(),port:sip_port,params:{branch:cryptoRand({length:16})}}];
    let content_length = 0;

    let REFER = {
        method  :   'REFER',
        uri     :   to,
        params  :   {gr:cryptoRand({length:9})},
        version :   version,
        headers :   {
                via             :   via,
                from            :   from,
                to              :   to,
                cseq            :   cseq,
                contact         :   contact,
                'refer-to'      :   referTarget,
                'call-id'       :   call_id,
                'Max-Forwards'  :   MaxFowards,
                'Allow'         :   allow,
                'Expires'       :   expires,
                'Privacy'       :   privacy,
                'User-Agent'    :   UserAgent,
        }
    };

    sip.send(REFER,(response)=>{
        switch(response.status){
            case 202 : 
                logger.info('[%s], status = [%d]',__file,response.status);
                break;
                default :
                logger.info('[%s], default case , status = [%d]',__file,response.status);
                sip.send(REFER);
                break;
        };
    });

}


stack.makeCall = function(source,destination,callback){
    logger.info("[%s] , stack.makeCall",__file);
    sip.start({protocol:'UDP',address:IP.address(),port:sip_port},(rs)=>{
        //logger.info("[%s] , %o",__file,rs);
        // logger.info("[%s] , %o",__file,rs.method); 
        switch(rs.method)
        {
            case 'NOTIFY':
                // Send 200OK
                logger.info('[%s], CASE : NOTIFY ',__file);
                sip.send(logger.info('[%s], %o',__file,sip.makeResponse(rs,200,'OK')));
                
                break;
                case 'OPTIONS':
                logger.info('[%s], CASE : OPTIONS ',__file)
                sip.send(logger.info('[%s], %o',__file,sip.makeResponse(rs,200,'OK')));
                
                break;
            default:
                logger.info("%o",rs.method);
        }
    });
    invite(sip,source,destination);
}

invite = function(sip,source,destination){

}

module.exports = stack;