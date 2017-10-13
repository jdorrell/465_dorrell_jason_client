﻿require('dotenv').config();

const tls = require('tls'),
    fs = require('fs'),
    msg = require('./message.json'),//will come from input file
    transmit = require('./transmit.js'),
    colors = require('colors');


var options = {
    host: process.env.SERVER_ADDRESS,
    port: process.env.SERVER_PORT,
    key: fs.readFileSync(process.env.KEY),
    cert: fs.readFileSync(process.env.CERT),
    ca: [fs.readFileSync(process.env.CA)]
};
    

/////////////////////////////////////////////////////////////////////////////////////////
function connected(stream) {

    if (stream) {
    } else {
        console.log("Connection failed");
    }
}



// needed to keep socket variable in scope  
var app = this;
//var transactionCount = 0;

// try to connect to the server  
app.socket = tls.connect(options, function () {
    // callback called only after successful socket connection  
    app.connected = true;
    if (app.socket.authorized) {

        // authorization successful 

        //console.log(app.socket);//for testing
        app.socket.setEncoding('utf-8');
        connected(app.socket);

    } else {

        // authorization failed  
        console.log(app.socket.authorizationError);
        connected(null);
    }
});

app.socket.addListener('data', function (data) {

    // received data  
    var res = data;//server response
    var req = transmit.send(res);//client request

    console.log(res.blue);

    if (req === ('\r\n' + process.env.CLIENT_END + '\r\n')) {

        //app.socket.write(msg.email_subject + msg.email_body);//keep for now - may send piecemeal later
        app.socket.write(JSON.stringify(msg.content));
        app.socket.write(req);

    } else

        if (req === res) {

            app.socket.close;//does not close

        } else {

            app.socket.write(req);

        };
});

app.socket.addListener('error', function (error) {
    if (!app.connected) {
        // socket was not connected, notify callback  
        connected(null);
    }
    console.log("FAIL");
    console.log(error);
});
app.socket.addListener('close', function () {
    // do something  
});  

//console.log(JSON.stringify(msg));     //keep for testing

//snippets
//tls.socket.authorized ? 'authorized' : 'unauthorized');
//process.stdin.pipe(callback);
//process.stdin.resume(callback);