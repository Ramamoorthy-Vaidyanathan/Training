const Models = require('../models/index');
const { Op } = require('../config/dbConfig')
const { redisClient } = require('../config/redisConfig')

const postMovies = async (request, response) => {
    const { id:userId } = request.user.dataValues;
    var payload = request.payload;
    const UserId = request.state.cid.id;
    payload = { ...payload, UserId }
    const result = await Models.movie.create(payload)
    redisClient.del(`movie?${userId}`)
    response(result);
}

const getAllMovies = async (request, response) => {
    const { id:userId } = request.user.dataValues;
    const movie = await redisClient.get(`movie?${userId}`)
    if (movie != null) {
        console.log("From Cache")
        response(JSON.parse(movie))
    } else {
        console.log("From DB!")
        const result = await Models.movie.findAll({
            where: { UserId: request.state.cid.id },
            order: [
                ['name', 'ASC']
            ]
        });
        redisClient.setEx(`movie?${userId}`, 100, JSON.stringify(result))
        response(result);
    }
}

const getAllCars = async (request, response) => {
    console.log(Models)
    const result = await Models.car.findAll();
    response(result);
}

const getMovieById = async (request, response) => {
    const { id:userId } = request.user.dataValues;
    const result = await Models.movie.findAll({
        where: {
            UserId: request.state.cid.id,
            id: request.params.movieId
        }
    });
    redisClient.del(`movie?${userId}`)
    response(result);
}

const updateMovie = async (request, response) => {
    const { id:userId } = request.user.dataValues;
    const payload = request.payload;
    const result = await Models.movie.update(payload, {
        where: { id: request.params.movieId }
    });
    redisClient.del(`movie?${userId}`)
    response(result);
}

const deleteMovie = async (request, response) => {
    const { id:userId } = request.user.dataValues;
    const result = await Models.movie.destroy({
        where: { id: request.params.movieId }
    });
    redisClient.del(`movie?${userId}`)
    response(result);
}

module.exports = { postMovies, getAllMovies, getMovieById, updateMovie, deleteMovie, getAllCars }