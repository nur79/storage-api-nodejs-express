const express = require('express')
const server = express()

// The tests exercise the server by requiring it as a module,
// rather than running it in a separate process and listening on a port
module.exports = server

// We'll store the data in memory
server.locals.storage   = {};


if (require.main === module) {
    // Start server only when we run this on the command line and explicitly ignore this while testing

    const CONFIG = require('./config/app');
    server.listen((CONFIG.port), () => {
        console.log(`App listening at port http://localhost:${CONFIG.port}!`);
    });
}

// load routes, middlewares and other necessities 
require('./loaders/default')(server, express);
