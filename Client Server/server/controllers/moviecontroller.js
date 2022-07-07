const Models = require('../models/index');
const { Op } = require('../config/dbConfig')



const postMovies = async (request, response) => {
    var payload = request.payload;
    const UserId = request.state.cid.id;
    payload = { ...payload, UserId }
    const result = await Models.movie.create(payload)
    response(result);
}

const getAllMovies = async (request, response) => {
    const result = await Models.movie.findAll({
        where: { UserId: request.state.cid.id },
        order: [
            ['name', 'ASC']
        ]
    });
    response(result);
}

const getMovieById = async (request, response) => {
    const result = await Models.movie.findAll({
        where: {
            UserId: request.state.cid.id,
            id: request.params.movieId
        }
    });
    response(result);
}

const updateMovie = async (request, response) => {
    const payload = request.payload;
    const result = await Models.movie.update(payload, {
        where: { id: request.params.movieId }
    });
    response(result);
}

const deleteMovie = async (request, response) => {
    const result = await Models.movie.destroy({
        where: { id: request.params.movieId }
    });
    response(result);
}

module.exports = { postMovies, getAllMovies, getMovieById, updateMovie, deleteMovie }