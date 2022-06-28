const { postMovies, getAllMovies } = require('../controllers/moviecontroller')


module.exports = [
    {
        method: 'GET',
        path: '/movies',
        handler: getAllMovies,
    },
    {
        method: 'POST',
        path: '/movie',
        handler: postMovies,
    }
]