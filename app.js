require('dotenv').config();

const tls = require('tls'),
    fs = require('fs');
    transmit = require('./transmit.js');

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
        // socket connected  
        //process.stdin.pipe(stream);
        //stream.write("helo");
    } else {
        console.log("Connection failed");
    }
}



// needed to keep socket variable in scope  
var app = this;

// try to connect to the server  
app.socket = tls.connect(options, function () {
    // callback called only after successful socket connection  
    app.connected = true;
    if (app.socket.authorized) {
        // authorization successful  
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
    //console.log(data);//start conversation here///////////////////////////////////////////
    var res = data;
    //transmit.send(res);
    app.socket.write(transmit.send(res));
    //////////////////////////////////if (data === process.env.SERVER_WELCOME) {
    //////////////////////////////////    //console.log('yippeeeee!');
    //////////////////////////////////    ///////////////////////////////////////call transmit here
    //////////////////////////////////    var res = data;
    //////////////////////////////////    app.socket.write(transmit.send(res));
    //////////////////////////////////};

    //////////////////////////////////if (data === "250 Hello client") {
    //////////////////////////////////    //console.log('yippeeeee!');
    //////////////////////////////////    ///////////////////////////////////////call transmit here
    //////////////////////////////////    app.socket.write(transmit.send);
    //////////////////////////////////};
    
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




//function connect() {
//    tls.socket = tls.connect(options, function () {
//        console.log('tls connection', tls.socket.authorized ? 'authorized' : 'unauthorized');
//        process.stdin.pipe(tls.socket);
//        process.stdin.resume();
//    });
//};

//connect();

//var connect = function () {
//    tls.socket = tls.connect(options, function () {
//        console.log('tls connection', tls.socket.authorized ? 'authorized' : 'unauthorized');
//        process.stdin.pipe(tls.socket);
//        process.stdin.resume();
//    });
//};

//connect.on('data', function (data) {
//    process.stdin.pipe(tls.socket);
//    process.stdin.resume();
//    tls.socket.write(data);
//    console.log(data);
//});
