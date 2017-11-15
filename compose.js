const prompt = require('prompt'),
    timestamp = require('unix-timestamp'),
    JsonDb = require('node-json-db'),
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
            }
        }
    };

module.exports =
    {
        input:

        function () {

            var draft = prompt.get(schema, function (err, result) {

                db.push('ID', { msgID, From: msg.email_user, To: result.TO, Subject: result.SUBJECT, Body: result.BODY });
                console.log("message queued".green);
                //console.log(draft);  //for testing

            });


            return draft;

        }
    }