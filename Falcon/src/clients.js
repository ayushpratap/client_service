const express = require('express');
const net  = require('net');
var request = require('request');
var CONFIG = require('./config/config');
const JsonSocket = require('json-socket');

const tcpClient = net.createConnection(CONFIG.tcp_server_port,CONFIG.tcp_server_host);

tcpClient.on('connect',function(){
    console.log("Connected to the server at "+CONFIG.tcp_server_host+":"+CONFIG.tcp_server_port);
    console.log("TCP client info "+tcpClient.address().address);
});


tcpClient.on('data',function(data){
    // Convert the Buffer to JSON object
    let reqInfo = JSON.parse(data.toString());

    // Get the route of the request
    switch(reqInfo.route){
        case '/':
            console.log(reqInfo);
        break;
        case '/makeCall':
            let options = {
                method:"POST",
                url:CONFIG.client_service_url+reqInfo.route,
                json:true,
                rejectUnauthorized:false,
                requestCert:false,
                body:reqInfo.data
            };
            request(options,function(error,res,body){
                console.log(body);
            });
            console.log(reqInfo);
<<<<<<< HEAD
            break;
        case '/makeCallMulti':
=======
        break;
        case '/makeCallMulti':
            // Make a HTTP request to client service
            let options = {
                method:"POST",
                url:CONFIG.client_service_url+reqInfo.route,
                json:true,
                rejectUnauthorized:false,
                requestCert:false,
                body:reqInfo.data
            };
            request(options,function(error,res,body){
                console.log(body);
            });
>>>>>>> e7a5bb949c4958cd79f636da0cd9dab426d2fe52
            console.log(reqInfo);
         break;
        default:
            console.log("default");
    }
});
