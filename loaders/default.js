
class Loader {
    constructor(server, express) {
        // const fs = require('fs');
        // const path = require('path');
        const parseError = require('parse-error');
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        // API root handler
        server.get('/', function (req, res) {
            res.statusCode = 200;
            res.json({ status: "success", message: "Data Storage API" })
        });
    
        // loading routes for data
        require('../routes/default')(server);
        // server.use('/', require('../routes/default'));

        // loading middleware for handling request exceptions
        server.use(require('../middlewares/requestMiddlware'));

        //This is here to handle all the uncaught promise rejections
        process.on('unhandledRejection', error => {
            console.error('Uncaught Error', parseError(error));
        });

    }


}

module.exports = (server, express) => { return new Loader(server, express) }




