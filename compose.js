require('dotenv').config();

const clear = require('./clear.js'),
    prompt = require('prompt'),
    timestamp = require('unix-timestamp'),
    JsonDb = require('node-json-db'),
    transmit = require('./transmit.js'),
    drafts = new JsonDb(process.env.DRAFT, true, true),
    msg = require('./message.json'),//remove when login function is built
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
            ACCEPT: {
                required: true
            }
        }
    };

module.exports =
    {
    input:

        function () {
            prompt.get(schema, function (err, result) {

                if (result.ACCEPT.toLowerCase() === 'yes') {
                    postmark();
                    prompt.get(['Send'], function (err, SEND_NOW) {

                        if (SEND_NOW.Send.toLowerCase() === 'yes') {
                            transmit.send();
                        };

                        if (SEND_NOW.Send.toLowerCase() === 'no') {
                            drafts.push(msgID, { From: msg.email_user, To: result.TO, Subject: result.SUBJECT, Body: result.BODY });
                            clear.queue();
                            console.log("message saved in drafts".green);
                        };
                    });
                };

                function postmark() {

                    const queue = new JsonDb(process.env.QUEUE, true, true);
                    queue.push('ID', { msgID, From: msg.email_user, To: result.TO, Subject: result.SUBJECT, Body: result.BODY });
                    console.log("message queued".green);

                    if (queue.msgID === '/%s', msgID) {
                        return;
                    };
                };
            });
            return;
        }
    }