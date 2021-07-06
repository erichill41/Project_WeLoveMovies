
exports.up = function(knex) {
  return knex.schema.createTable('movies_theatres', (table) => {
      table
        .foreign('movie_id')
        .references('movie_id')
        .inTable('movies')
        .onDelete('CASCADE')
      table
        .foreign('theatre_id')
        .references('theatre_id')
        .inTable('theatres')
        .onDelete('CASCADE')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('movies_theatres');
};
