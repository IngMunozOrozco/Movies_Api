const Genres = require("./Genres");
const Actors = require("./Actors");
const Directors = require("./Directors");
const Movies = require("./Movies");


Movies.belongsToMany(Actors, { through: 'moviesActors'});
Actors.belongsToMany( Movies, { through: 'moviesActors'});

Genres.belongsToMany(Movies, { through: 'GenresMovies'});
Movies.belongsToMany(Genres, { through: 'GenresMovies'});

Directors.belongsToMany(Movies, {through: 'directorsMovies'});
Movies.belongsToMany(Directors, {through: 'directorsMovies'} );




