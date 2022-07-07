const { postMovies, getAllMovies, getMovieById, updateMovie, deleteMovie } = require('../controllers/moviecontroller')


module.exports = [
    {
        method: 'GET',
        path: '/movies',
        handler: getAllMovies,
    },
    {
        method: 'GET',
        path: '/movies/{movieId}',
        handler: getMovieById,
    },
    {
        method: 'POST',
        path: '/movie',
        handler: postMovies,
    },
    {
        method: 'PUT',
        path: '/movie/{movieId}',
        handler: updateMovie,
    },
    {
        method: 'DELETE',
        path: '/movie/{movieId}',
        handler: deleteMovie,
    }
]