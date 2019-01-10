const express = require('express');
const net  = require('net');
var request = require('request');
var CONFIG = require('./config/config');
const JsonSocket = require('json-socket');
var options = {};
const logger = CONFIG.logger;

// Create client socket
logger.info('Creating client socket');
const tcpClient = net.createConnection(CONFIG.tcp_server_port,CONFIG.tcp_server_host);

//  Handle connect event
tcpClient.on('connect',function(){
    logger.info("Connected to the server at "+CONFIG.tcp_server_host+":"+CONFIG.tcp_server_port);
    logger.info("TCP client info "+tcpClient.address().address);
});

//  Handle data event
tcpClient.on('data',function(data){
    logger.info('Data recevied');

    // Convert the Buffer to JSON object
    let reqInfo = JSON.parse(data.toString());
    logger.debug(reqInfo);
    // Get the route of the request
    switch(reqInfo.route){
        case '/':
            logger.info("Case : '/'");
            
            // Set the options for HTTPS request
            options.method              = "GET";
            options.url                 = CONFIG.client_service_url+reqInfo.route;
            options.rejectUnauthorized  = false;
            options.requestCert         = false;
            options.body                = reqInfo.data;

            logger.debug('HTTPS request options : %o',options);
            
            // Make HTTPS request
            request(options,function(error,res,body){
                logger.info('Response for HTTPS request');
                options = {};
                logger.debug('Cleared HTTPS options : %o ',options);
                logger.info('Response body : %o ',body);
            });
        break;
        case '/api/makeCall':
            logger.info("Case : /api/makeCall");

            // Set the options for HTTPS request
            options.method              = "POST";
            options.url                 = CONFIG.client_service_url+reqInfo.route;
            options.json                = true;
            options.rejectUnauthorized  = false;
            options.requestCert         = false;
            options.body                = reqInfo.data;

            logger.debug(options);

            //  Make HTTPS request
            request(options,function(error,res,body){
                logger.info('Response for HTTPS request');
                options = {};
                logger.debug('Cleared HTTPS options', options);
                logger.info(body);
            });
        break;
        case '/api/makeCallMulti':
            // Make a HTTP request to client service
            console.log(reqInfo);
            options.method              = "POST";
            options.url                 = CONFIG.client_service_url+reqInfo.route;
            options.json                = true;
            options.rejectUnauthorized  = false;
            options.requestCert         = false;
            options.body                = reqInfo.data;
            request(options,function(error,res,body){
                options = {};
                console.log(body);
            });
         break;
        default:
            console.log("default");
    }
});

//  Handle error event
tcpClient.on('error',function(err){
    logger.error(err);
});
