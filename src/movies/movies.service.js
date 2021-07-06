const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

function list() {
    return knex('movies').select('*');
}

function isShowing() {
    return knex('movies')
        .join('movies_theatres', 'movies.movie_id', 'movies_theatres.movie_id')
        .select('movies.*')
        .where({ is_showing: true })
        .groupBy('movie.movie_id')
}

const addCritic = mapProperties({
    critic_id: 'critic.critic_id',
    preferred_name: 'critic.preferred_name',
    surname: 'critic.surname',
    organization_name: 'critic.organization_name',
});

function read(movieId) {
    return knex('movies')
        .select('*')
        .where({ movie_id: movieId })
        .first();
}

function readTheatres(movieId) {
    return knex('theatres as t')
        .join('movies_theatres as mt', 't.theatre_id', 'mt.theatre_id')
        .select('*')
        .where({ movie_id: movieId, is_showing: true });
}

function readReviews(movieId) {
    return knex('reviews as r')
        .join('critics as c', 'r.critic_id', 'c.critic_id')
        .select('*')
        .where({ movie_id: movieId })
        .then((result) => {
            const returnList = [];
            result.forEach((item) => {
                const itemWithCritic = addCritic(item);
                returnList.push(itemWithCritic);
            });
            return returnList;
        });
}

module.exports = {
    list,
    isShowing,
    read,
    readTheatres,
    readReviews,
};