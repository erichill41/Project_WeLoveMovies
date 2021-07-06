const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({
        status: 400,
        message: 'Movie cannot be found.'
    })
}

async function list(req, res) {
    const isShowing = req.query.is_showing;
    if (isShowing) {
        res.json({ data: await service.isShowing() })
    } else {
        res.json({ data: await service.list() })
    }
}

async function read(req, res) {
    const { movie } = res.locals.movie;
    res.json({ data: movie })
}

async function readTheatres(req, res) {
    res.json({ data: await service.readTheatres(req.params.movieId) });
}

async function readReviews(req, res) {
    res.json({ data: await service.readReviews(req.params.movieId) });
}


module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    readTheatres: [asyncErrorBoundary(movieExists), readTheatres],
    readReviews: [asyncErrorBoundary(movieExists), readReviews],
}