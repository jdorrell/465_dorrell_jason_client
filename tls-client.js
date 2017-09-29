require('dotenv').config();

var tls = require('tls'),
    fs = require('fs'),
    test = require('./message.json');
var modifiedTest = JSON.stringify(test);
console.log(modifiedTest);    
    
var options = {
    host: process.env.SERVER_ADDRESS,
    port: process.env.SERVER_PORT,
    key: fs.readFileSync(process.env.KEY),
    cert: fs.readFileSync(process.env.CERT),
    ca: [fs.readFileSync(process.env.CA)]
};

var message = process.env.MESSAGE;
console.log(message);

function connection() {

    var socket = tls.connect(options, function () {
        console.log('tls_client: connection to server', socket.authorized ? 'authorized' : 'unauthorized');
        process.stdin.pipe(socket);
        process.stdin.resume();
    });

    socket.setEncoding('utf8');
    socket.write(modifiedTest);
    socket.on('data', function (fromServer) {

        console.log("tls_client has received:%s \n", fromServer);
        
        if (fromServer === modifiedTest) {
            socket.write("line 2");
        };

        if (fromServer == "line 2") {
            socket.write("line 3");
        };

        if (fromServer == "line 3") {
            socket.write("line 4");
        };

        if (fromServer == "line 4") {
            socket.write("socket closing");
        };

        if (fromServer == "socket closing") {
            socket.destroy();
        };

    });

    socket.once('close', function () {
        console.log("socket closed");
    });

    
};

module.exports 
    var  connect = connection();
