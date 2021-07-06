const knex = require('../db/connection');
const reduceProperties = require('../utils/reduce-properties');

const reduceMovies = reduceProperties('theatre_id', {
    movie_id: ['movies', null, 'movie_id'],
    title: ['movies', null, 'title'],
    runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
    rating: ['movies', null, 'rating'],
    description: ['movies', null, 'description'],
    image_url: ['movies', null, 'image_url'],
    is_showing: ['movies', null, 'is_showing'],
});

function list() {
    return knex('theatres as t')
        .join('movies_theatres as mt', 't.theatre_id', 'mt.theatre_id')
        .join('movies as m', 'mt.movie_id', 'm.movie_id')
        .select('*')
        .then((result) => reduceMovies(result, null))
}

module.exports = {
    list,
}