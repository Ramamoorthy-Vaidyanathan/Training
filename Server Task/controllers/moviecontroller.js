const Models = require('../models/index')


const postMovies = async (request, response) => {
    const payload = request.payload;
    const result = await Models.movie.create(payload)
    response(result);
}

const getAllMovies = async (request, response) => {
    const result = await Models.movie.findAll({
        include: [Models.theater]
    });
    response(result);
}

module.exports = { postMovies, getAllMovies }