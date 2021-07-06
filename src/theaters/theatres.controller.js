const service = require('./theatres.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res) {
    res.json({ data: await service.list() })
}


module.exports = {
    list: asyncErrorBoundary(list),
}