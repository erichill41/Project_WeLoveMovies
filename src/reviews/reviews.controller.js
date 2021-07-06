const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    return next({
        status: 404,
        message: 'Review cannot be found.'
    });
}

async function update(req, res) {
    const oldReview = res.locals.review;
    const updatedReview = {
        ...req.body.data,
        review_id: oldReview,
    };
    await service.update(updatedReview);
    res.json({ data: await service.returnUpdated(oldReview) });
}

async function destroy(req, res) {
    await service.destroy(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), update],
    delete: [asyncErrorBoundary(reviewExists), destroy],
}