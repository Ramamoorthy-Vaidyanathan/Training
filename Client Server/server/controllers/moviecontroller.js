const Models = require('../models/index');
const { Op } = require('../config/dbConfig')
const { redisClient } = require('../config/redisConfig');
const { emailQueue, sendEmail } = require('../bullmq/emailQueue');
const { getAllMail } = require('../controllers/usercontroller')

const postMovies = async (request, response) => {
    try{
        const { id:userId, email} = request.user.dataValues;
        var payload = request.payload;
        const UserId = request.state.cid.id;
        payload = { ...payload, UserId }
        const result = await Models.movie.create(payload)
        const allMails = await getAllMail()
        console.log(allMails);
        await sendEmail({email, detail: payload, allMails})
        // emailQueue.add(payload)
        redisClient.del(`movie?${userId}`)
        response(result);
    }
    catch(err){
        console.log("Error", err)
    }
    
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
        },
        include: [Models.theater]
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