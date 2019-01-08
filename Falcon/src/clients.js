const express = require('express');
const net  = require('net');
var CONFIG = require('./config/config');
const JsonSocket = require('json-socket');
var reqInfo = {};

const tcpClient = net.createConnection(CONFIG.tcp_server_port,CONFIG.tcp_server_host);

tcpClient.on('connect',function(){
    console.log("Connected to the server at "+CONFIG.tcp_server_host+":"+CONFIG.tcp_server_port);
    console.log("TCP client info "+tcpClient.address().address);
});


tcpClient.on('data',function(data){
    // Convert the Buffer to JSON object
    reqInfo = JSON.parse(data.toString());

    // Get the route of the request
    switch(reqInfo.route){
        case '/':
            console.log("YES");
        default:
            console.log("FAIL");
    }
});