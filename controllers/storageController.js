const parseError = require('parse-error');
const crypto = require('crypto');
const respond   = require('../helpers/respond');

const findData = function (arr, searchKey) {
    return arr.filter(obj => obj.oid === searchKey);
}

const addObject = async function (req, res) {

    try {
        if (Object.keys(req.body).length === 0 && Object.getPrototypeOf(req.body) === Object.prototype) {
            return respond.notFound(res);
        } else {
            const storage = req.app.locals.storage;
            const repository = req.params.repository;
            const data = {
                oid: crypto.createHash('sha256').update(JSON.stringify(req.body)).digest('hex'),
                data: req.body
            };            
            if (!(repository in storage)) {
                storage[repository] = [data];
            } else {
                const found = findData(storage[repository], data.oid);
                if (found.length === 0) {
                    storage[repository].push(data);
                }
            }

            return res.status(201)
                .send({ oid: data.oid, size: JSON.stringify(req.body).length });
        }

    } catch (err) {
        console.log("Internal Error", parseError(err));
        res.status(500).send("Internal Error");
    }
}


const getObject = async function (req, res) {

    try {
        const storage = req.app.locals.storage;
        const repository = req.params.repository;
        if (!req.params.objectId || !(repository in storage)) {
            return respond.notFound(res);
        }

        const found = findData(storage[repository], req.params.objectId);
        if (!(req.params.repository in storage) || found.length === 0) {
            return respond.notFound(res);
        }
        return res.send(found[0].data);
    } catch (err) {
        console.log("Internal Error", parseError(err));
        res.status(500).send("Internal Error");
    }
}

const deleteObject = async function (req, res) {

    try {
        const storage = req.app.locals.storage;
        const repository = req.params.repository;
        if (!req.params.objectId || !(repository in storage)) {
            return respond.notFound(res);
        }

        const found = findData(storage[repository], req.params.objectId);
        if (!(req.params.repository in storage) || found.length === 0) {
            return respond.notFound(res);
        }
        const index = storage[repository].findIndex(o => o.oid === req.params.objectId);
        if (!isNaN(index)) {
            delete storage[repository][index];
            return res.status(200)
                .send({
                    message: 'success!'
                });
        } else {
            return respond.notFound(res);
        }
    } catch (err) {
        console.log("Internal Error", parseError(err));
        return res.status(500).send("Internal Error");
    }
}

module.exports.addObject = addObject;
module.exports.getObject = getObject;
module.exports.deleteObject = deleteObject;


