const express = require('express');
const net  = require('net');
var request = require('request');
var CONFIG = require('./config/config');
const JsonSocket = require('json-socket');
var options = {};

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
            // Make a HTTP request to client service
            options.method              = "GET";
            options.url                 = CONFIG.client_service_url+reqInfo.route;
            options.json                = true;
            options.rejectUnauthorized  = false;
            options.requestCert         = false;
            options.body                = reqInfo.data;
            request(options,function(error,res,body){
                console.log(options);
                options = {};
                console.log(body);
            });
        break;
        case '/api/makeCall':
            // Make a HTTP request to client service
            console.log(reqInfo);
            options.method              = "POST";
            options.url                 = CONFIG.client_service_url+reqInfo.route;
            options.json                = true;
            options.rejectUnauthorized  = false;
            options.requestCert         = false;
            options.body                = reqInfo.data;
            request(options,function(error,res,body){
                console.log(options);
                options = {};
                console.log(body);
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
                console.log(options);
                options = {};
                console.log(body);
            });
         break;
        default:
            console.log("default");
    }
});
