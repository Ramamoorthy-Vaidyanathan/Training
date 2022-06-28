const { postTheater, getAllTheaters, getTheatersByMovieId} = require('../controllers/theatercontroller')


module.exports = [
    {
        method: 'GET',
        path: '/theaters',
        handler: getAllTheaters,
    },
    {
        method: 'GET',
        path: '/theater/{id}',
        handler: getTheatersByMovieId,
    },
    {
        method: 'POST',
        path: '/theater',
        handler: postTheater,
    }
]