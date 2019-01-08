const express = require('express');
const net  = require('net');
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
            console.log(reqInfo);
            break;
        case '/makeCallMulti':
            console.log(reqInfo);
            break;
        default:
            console.log("default");
    }
});
