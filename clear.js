require('dotenv').config();

const   JsonDb = require('node-json-db'),
        drafts = new JsonDb(process.env.DRAFT, true, true);

module.exports =
    {
        queue:

        function () {

            msgID = null;
            const queue = new JsonDb(process.env.QUEUE, true, true);
            queue.push('ID', { msgID, From: null, To: null, Subject: null, Body: null });

            return;
    },

    
        drafts:

        function () {
            return;
    }
}
    