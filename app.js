require('dotenv').config();

const   compose = require('./compose.js'),
        transmit = require('./transmit.js'),
        prompt = require('prompt'),
        colors = require('colors');

/////////////////////////////////////////////////////////////////////////////////////////////
prompt.start();

prompt.get(['command'], function (err, user_input) {

    if (user_input.command.toLowerCase() === process.env.COMPOSE_MAIL) {

        compose.input();

    };

    if (user_input.command.toLowerCase() === process.env.SEND_MAIL) {
        transmit.send();
    };

});
