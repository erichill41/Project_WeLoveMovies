const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const reviewExists = require('../reviews/reviews.controller');

async function movieExists(req, res, next) {
    const movieId = req.params.movieId;
    const movie = await service.read(movieId);
   
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({
        status: 404,
        message: 'Movie cannot be found.'
    })
}

async function list(req, res) {
    const isShowing = req.query;
    console.log(isShowing);
    if (isShowing) {
        const showList = await service.isShowing();
       console.log(showList);
        res.json({ data: showList })
    } else {
        res.json({ data: await service.list() })
    }
}

async function read(req, res) {
    res.json({ data: res.locals.movie })
}

async function readTheaters(req, res) {
    res.json({ data: await service.readTheaters(req.params.movieId) });
}

async function readReviews(req, res) {
    res.json({ data: await service.readReviews(req.params.movieId) });
}


module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    readTheaters: [asyncErrorBoundary(movieExists), readTheaters],
    readReviews: [asyncErrorBoundary(reviewExists), readReviews],
}