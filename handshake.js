require('dotenv').config();

var transactionCount = 0;

module.exports =
    {
        send:
        function (res) {

            const msg = require(process.env.QUEUE);//will come from input file

            transactionCount++
            if (res === process.env.SERVER_WELCOME) {

                //console.log('condition fullfilled');//for testting
                return (process.env.CLIENT_HELO);

            };

            if (res === process.env.SERVER_HELLO && transactionCount === 2) {

                //console.log('condition fullfilled');//for testting
                return (process.env.MAIL_FROM + ' \x3C' + msg.From + '\x3E');

            };

            if (res === process.env.SERVER_OK && transactionCount === 3) {

                //console.log('condition fullfilled');//for testting
                return (process.env.RCPT_TO + ' \x3C' + msg.To + '\x3E');


            };

            if (res === process.env.SERVER_OK && transactionCount === 4) {

                //console.log('condition fullfilled');//for testting
                return (process.env.DATA);

            };

            if (res === process.env.SERVER_SEND && transactionCount === 5) {

                //console.log('condition fullfilled');//for testting
                return ('\r\n' + process.env.CLIENT_END + '\r\n');

            };

            if (res === process.env.SERVER_OK + ", " + process.env.SERVER_ACCEPTS && transactionCount === 6) {

                //console.log('condition fullfilled');//for testting
                return (process.env.QUIT);
            };

            if (res === process.env.SERVER_GOODBYE && transactionCount === 7) {

                //console.log('condition fullfilled');//for testting
                console.log("MESSAGE SENT!".green);
                return (res);
            };
        }
    };
//////////////////////////////////////////////////////////////////////////////////////////
