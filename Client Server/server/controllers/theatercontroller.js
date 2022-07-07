const Models = require('../models/index')


const postTheater = async (request, response) => {
    const payload = request.payload;
    const Movie = await Models.movie.findOne({where: {id: payload.movie_id}})
    delete payload.movie_id;
    var Theater = await Models.theater.findOne({
        where: {theater_name: payload.theater_name}
    })
    if(Theater == null){
        Theater = await Models.theater.create(payload)
    }
    Movie.addTheater(Theater);
    // const movieList = await Movie.getTheaters()
    // const theaterList = await Theater.getMovies()
    // console.log(movieList)
    // console.log(theaterList)
    response(Theater);
}

const getAllTheaters = async (request, response) => {
    const result = await Models.theater.findAll({
        include: [Models.movie]
    });
    response(result);
}

const getTheatersByMovieId = async (request, response) => {
    const movie_id = request.params.id;
    const Movie = await Models.movie.findOne({where: {id: movie_id}})
    response(Movie.getTheaters());
}

module.exports = { postTheater, getAllTheaters, getTheatersByMovieId }