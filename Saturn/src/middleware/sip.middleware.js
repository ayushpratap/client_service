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
const digest                = require('sip/digest')
const logger                = CONFIG.logger;
const stack                 = {};
const curl                  = new(require('curl-request'))();
const kill                  = require('kill-port')
const nrc                   = require('node-run-cmd')
stack.startStack = function(source = null , destination = null, request = null){
    logger.info("[%s] , stack.startStack",__file);
    let sip_port = CONFIG.sip_port;
    logger.info(sip_port);
    //nrc.run('sudo fuser 9001/udp -k')
    //kill('9001','UDP').then(logger.info('killed'))
    sip.start({protocol:'UDP',address:IP.address(),port:sip_port},(rs)=>{
        //logger.info("[%s] , %o",__file,rs);
       // logger.info("[%s] , %o",__file,rs.method); 
        switch(rs.method)
        {
            case 'NOTIFY':
                // Send 200OK
                logger.info('[%s], CASE : NOTIFY ',__file);
                //sip.send(logger.info('[%s], %o',__file,sip.makeResponse(rs,200,'OK')));
                sip.send(sip.makeResponse(rs,200,'OK'))
                //curl.setHeaders(['request:request', 'source:source', 'destination:destination']).post('http://127.0.0.1:8443/api/makeCall')
                //stack.startStack(source,destination,request);
                break;
            case 'OPTIONS':
<<<<<<< HEAD
                let source = 'Renu';
                let destination = 'Shiva';
                let request = 'refer'
=======
>>>>>>> 64ff0dfda850a2e651be73ef8052e28f52ebf4f4
                logger.info('[%s], CASE : OPTIONS ',__file)
                //sip.send(logger.info('[%s], %o',__file,sip.makeResponse(rs,200,'OK')));
                sip.send(sip.makeResponse(rs,200,'OK'))/*sip.js line 1370*/
                
                //stack.startStack(source,destination,request);
                break;
            default:
                logger.info("%o",rs.method);
                break;
        }
        //logger.info('%o',sip)
        refer(sip/*,6485,8757*/)
    });
    //logger.info('%o',sip)
    register(sip);
    0
}

register = function(sip){
    logger.info("[%s] , stack.register",__file);
    //logger.info('%o',sip)
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
    let call_id     = cryptoRand({length:14})+"@"+IP.address();
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
    //kill('9001','UDP').then(logger.info).catch(logger.info);
    sip.send(REGISTER,function(rs){
        //logger.info('%o',rs)
        switch(rs.status)
        {
            case 200:
                logger.info("[%s] , status = [%d]",__file,rs.status);
                //  After receving 200OK now send 
                //logger.info('%o',sip)
                break;
            default:
                //logger.info('%o',rs)
                logger.info("[%s] , default case , status = [%d]",__file,rs.status);
                //logger.info('%o',rs);
                /*let authorization = {
                    scheme:'rs.'
                }
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
                };*/
                //logger.info("%o",rs.headers['www-authenticate'])
               /* REGISTER.headers['Authorization'] = rs.headers['www-authenticate']
                var varia = rs.headers['www-authenticate']
                //logger.info('%o',rs)
                var ctx = rs.headers['www-authenticate']
                ctx.proxy = false
                ctx.qop = 'auth'
                //logger.info('%o',ctx)
                var res = 1
                res = digest.authenticateResponse(ctx,rs);
                //logger.info(res)
                REGISTER.headers['Authorization'] = {username:name , uri:registerUri , response:res}
                logger.info('%o',REGISTER)*/
                sip.send(REGISTER);
               // register(sip);

                break;
        }
    });
}

/*stack.referCall = function(source,destination,callback){
    logger.info("[%s] , stack.makeCall",__file);
    /*sip.start({protocol:'UDP',address:IP.address(),port:sip_port},(rs)=>{
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
}*/

refer = function(sip/*,source,destination*/){
    let source = 'ashish'
    let destination = 'naman'
    //kill('9001','UDP').then(logger.info('killed'));
    //logger.info('%o',sip)
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
<<<<<<< HEAD
    let from        = {name:'kanishk',uri:'sip:kanishk@alexavm-VirtualBox',params:{tag:'1237898524'}};
    let to          = {name:source,uri:'sip:'+source+'@alexavm-VirtualBox',params:{gr:'852741963'}};
    let referTarget = {name:destination,uri:'sip:'+destination+'@alexavm-VirtualBox'};
    let call_id     = cryptoRand({length:14})+"@alexavm-VirtualBox";
    let cseq        = {method:'REGISTER',seq:cryptoRand({length:9,characters: '1234567890'})};
=======
    let from        = {name:name,uri:'sip:'+localExnt+'@'+domain,params:{tag:cryptoRand({length:10})}};
    let to          = {name:source,uri:'sip:'+source+'@'+domain,params:{gr:cryptoRand({length:9})}};
    let referTarget = {name:destination,uri:'sip:'+destination+'@'+domain};
    let call_id     = cryptoRand({length:14})+"@"+domain;
    let cseq        = {method:'REFER',seq:cryptoRand({length:9,characters: '1234567890'})};
>>>>>>> 64ff0dfda850a2e651be73ef8052e28f52ebf4f4
    let allow       = "INVITE, ACK, CANCEL, BYE, NOTIFY, REFER, OPTIONS, UPDATE";
    let contact     = [{name:'kanishk',uri:'sip:kanishk@10.0.97.75:5070;transport=UDP'}];
    let expires     = 3600;
    let privacy     = "none";
    //let UserAgent   = "NECSDT700_ITL-12G/3.0.21.19_"+macAddr;
    let UserAgent   = "NECSDT800_ITY-8LDX/4.3.18.14_"+macAddr;
    let version     = "2.0";
    //let via         = [{version:version,protocol:'UDP',host:IP.address(),port:sip_port,params:{branch:cryptoRand({length:16})}}];
    let via         = [];
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
    //logger.info('hii')
    sip.send(REFER,(response)=>{
        //logger.info('%o',response)
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

stack.subscribe = function(){
    logger.info("[%s], stack.subscribe",__file);
    stack.start({protocol:"UDP" , address:"IP.address()"},function(){

    })
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
<<<<<<< HEAD
    logger.info("[%s] , stack.invite",__file);
=======
    logger.info("[%s] , stack.refer",__file);
>>>>>>> 64ff0dfda850a2e651be73ef8052e28f52ebf4f4
    let domain      = CONFIG.sip_domain;
    let localExnt   = CONFIG.sip_local_extn;
    let transport   = CONFIG.sip_transport;
    let macAddr     = CONFIG.mac_addr;
    let MaxFowards  = CONFIG.max_forwards;
    let regisAddr   = CONFIG.sip_regis_addr;
    let name        = CONFIG.sip_local_name;
    let sip_port    = CONFIG.sip_port;
    let registerUri = 'sip:'+regisAddr;
<<<<<<< HEAD
    let from        = {name:source,uri:'sip:'+source+'@'+IP.address(),params:{tag:cryptoRand({length:10})}};
    let to          = {name:destination,uri:'sip:'+destination+'@'+domain,params:{gr:cryptoRand({length:9})}};
    //let referTarget = {name:destination,uri:'sip:'+destination+'@'+domain};
    let call_id     = cryptoRand({length:14})+"@"+domain;
    let cseq        = {method:'INVITE',seq:cryptoRand({length:9,characters: '1234567890'})};
    let allow       = "INVITE, ACK, CANCEL, BYE, NOTIFY, REFER, OPTIONS, UPDATE";
    let contact     = [{name:source,uri:'sip:'+source+'@'+IP.address()+':'+sip_port+';transport='+transport}];
=======
    let from        = {name:name,uri:'sip:'+source+'@'+domain,params:{tag:cryptoRand({length:10})}};
    let to          = {name:source,uri:'sip:'+destination+'@'+domain};
    let call_id     = cryptoRand({length:14})+"@"+domain;
    let cseq        = {method:'INVITE',seq:cryptoRand({length:9,characters: '1234567890'})};
    let allow       = "INVITE, ACK, CANCEL, BYE, NOTIFY, REFER, OPTIONS, UPDATE";
    let contact     = [{name:name,uri:'sip:'+source+'@'+IP.address()+':'+sip_port+';transport='+transport}];
>>>>>>> 64ff0dfda850a2e651be73ef8052e28f52ebf4f4
    let expires     = 3600;
    let privacy     = "none";
    //let UserAgent   = "NECSDT700_ITL-12G/3.0.21.19_"+macAddr;
    let UserAgent   = "NECSDT800_ITY-8LDX/4.3.18.14_"+macAddr;
    let version     = "2.0";
    let via         = [{version:version,protocol:'UDP',host:IP.address(),port:sip_port,params:{branch:cryptoRand({length:16})}}];
    let content_length = 0;
<<<<<<< HEAD

    let INVITE = { 
      method: 'INVITE'
    , uri: to
    , version: '2.0'
    , headers: 
       { via: via
       , from: from
       , to: to
       , 'call-id': call_id
       , cseq: cseq
       , contact: contact
       , 'max-forwards': MaxFowards
       , subject: 'Performance Test'
       , 'content-type': 'application/sdp'
       , 'content-length': content_length
       }
    , content: 'v=0\r\no=source 53655765 2353687637 IN IP4 \r\ns=-\r\nc=IN IP4 domain\r\nt=0 0\r\nm=audio 6000 RTP/AVP 0\r\na=rtpmap:0 PCMU/8000'
    }
=======

    let INVITE = {
        method  : 'INVITE',
        uri     : to,
        version : version,
        headers : {
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
    , content: 'v=0\r\no=source 53655765 2353687637 IN IP4 \r\ns=-\r\nc=IN IP4 domain\r\nt=0 0\r\nm=audio 6000 RTP/AVP 0\r\na=rtpmap:0 PCMU/8000'
    }

    sip.send(INVITE,(rs)=>{
        switch(rs.status)
        {
            case 200:
                logger.info("[%s] , status = [%d]",__file,rs.status);

                //  After receving 200OK now send 
                break;
            default:
                logger.info("[%s] , default case , status = [%d]",__file,rs.status);
                sip.send(INVITE);
                break;
        }
    });
>>>>>>> 64ff0dfda850a2e651be73ef8052e28f52ebf4f4
}

module.exports = stack;
