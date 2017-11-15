const prompt = require('prompt'),
    timestamp = require('unix-timestamp'),
    JsonDb = require('node-json-db'),
    transmit = require('./transmit.js'),
    msg = require('./message.json');//remove when login function is built

var db = new JsonDb(process.env.QUEUE, true, true),
    msgID = "/" + timestamp.now(),
    schema = {
        properties: {
            TO: {
                required: true
            },
            SUBJECT: {
                required: true
            },
            BODY: {
                required: true
            },
            SEND_NOW: {
                required: true
            }
        }
    };

module.exports =
    {
        input:

        function () {

            prompt.get(schema, function (err, result) {

                db.push('ID', { msgID, From: msg.email_user, To: result.TO, Subject: result.SUBJECT, Body: result.BODY });
                console.log("message queued".green);

                //console.log(result.SEND_NOW);  //for testing
                if (result.SEND_NOW === 'yes') transmit.send();

            });


            return;

        }
    }