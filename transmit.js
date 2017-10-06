require('dotenv').config();

module.exports = {
    send:   function (res) {
                //console.log(res);
                // return ('helo');
                if (res === process.env.SERVER_WELCOME) {
                    console.log(res);
                    return (process.env.CLIENT_HELO);
                };

                if (res === process.env.SERVER_HELLO) {
                    console.log(res);
                    return ('handshake complete!!!');
                };
            }
};