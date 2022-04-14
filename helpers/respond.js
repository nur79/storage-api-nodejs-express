
module.exports.notFound = (res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(404)
            .send({
                message: 'Object not found!'
            });
}