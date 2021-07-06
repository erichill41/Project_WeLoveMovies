const router = require('express').Router({ mergeParams: true });
const controller = require('./theatres.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;