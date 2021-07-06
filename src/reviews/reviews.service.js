const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

function read(reviewId) {
    return knex('reviews')
        .select('*')
        .where({ review_id: reviewId })
        .first();
}

function addCritic(reviews) {
  return reviews.map((review) => {
    return {
      review_id: review.review_id,
      content: review.content,
      score: review.score,
      created_at: review.created_at,
      updated_at: review.updated_at,
      critic_id: review.critic_id,
      movie_id: review.movie_id,
      critic: {
        preferred_name: review.preferred_name,
        surname: review.surname,
        organization_name: review.organization_name,
      },
    };
  });
}

function readReviewWithCritic(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.content",
      "r.created_at",
      "r.critic_id",
      "r.movie_id",
      "r.review_id",
      "r.score",
      "r.updated_at",
      "c.organization_name",
      "c.preferred_name",
      "c.surname"
    )
    .where({ "r.review_id": review_id })
    .then(addCritic);
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update({ content: updatedReview.content, score: updatedReview.score });
  //.then((review) => readReviewWithCritic(review[0].review_id));
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
    readReviewWithCritic,
}