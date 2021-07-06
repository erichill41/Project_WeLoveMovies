const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

function read(reviewId) {
    return knex('reviews')
        .select('*')
        .where({ review_id: reviewId })
        .first();
}

function update(updatedReview) {
    return knex('reviews as r')
        .join('critics as c', 'r.critic_id', 'c.critic_id')
        .select('*')
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, '*')
}

const addCritic = mapProperties({
    preferred_name: 'critic.preferred_name',
    surname: 'critic.surname',
    organization_name: 'critic.organization_name',
});

function returnUpdated(reviewId) {
    return knex('reviews as r')
        .join('critics as c', 'r.critic_id', 'c.critic_id')
        .select('*')
        .where({ review_id: reviewId })
        .first()
        .then((result) => addCritic(result))
        .then((result) => {
            const addTimes = {
                ...result,
                created_at: 'created',
                updated_at: 'updated',
            };
            return addTimes;
        })
}

function destroy(reviewId) {
    return knex('reviews')
    .where({ review_id: reviewId })
    .del();
}

module.exports = {
    read,
    update,
    destroy,
    returnUpdated,
}