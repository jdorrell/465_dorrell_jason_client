require('dotenv').config();

var tls = require('tls'),
    fs = require('fs');

var options = {
    host: process.env.SERVER_ADDRESS,
    port: process.env.SERVER_PORT,
    key: fs.readFileSync(process.env.KEY),
    cert: fs.readFileSync(process.env.CERT),
    ca: [fs.readFileSync(process.env.CA)]
};

var cleartextStream = tls.connect(options, function () {
    console.log('connection to server', cleartextStream.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(cleartextStream);
    process.stdin.resume();
});

cleartextStream.setEncoding('utf8');
cleartextStream.on('data', function (data) {
    console.log(data);
});

//cleartextStream.on('err', function (error) {
//    console.log('server disconnected');
//    //server.close;
//});

//cleartextStream.on('end', function (server) {
    //console.log('server disconnected');
    //server.close;
//});