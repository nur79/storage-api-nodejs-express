// defining routes
module.exports = server => {
    const storageController = require('../controllers/storageController');
    var router              = require('express').Router();
    const CONFIG            = require('../config/app');

    router.put('/:repository', storageController.addObject);
    router.get('/:repository/:objectId', storageController.getObject);
    router.delete('/:repository/:objectId', storageController.deleteObject);

    server.use('/data', router);
};
