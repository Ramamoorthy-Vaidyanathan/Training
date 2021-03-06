const Models = require('../models/index')
const bcrypt = require('bcrypt')
const { Op } = require('../config/dbConfig')
const jwt = require('jsonwebtoken')
const { redisClient } = require('../config/redisConfig')



const registerUser = async (request, response) => {
    const payload = request.payload;
    const IsUserExist = await Models.user.findOne({
        where: {
            [Op.or] : [
                { email: payload.email },
                { user_name: payload.user_name }
            ]
        }
    })
    if(IsUserExist){
        response({ message: "User Already Exist!! Pls Login to Continue "});
    }
    payload["password"] = bcrypt.hashSync(payload.password, 10)
    const User = await Models.user.create(payload)
    response({ message: "User Registred Successfully! Login to Continue "});
}

const loginUser = async (request, response) => {
    const payload = request.payload;
    const User = await Models.user.findOne({where: {email: payload.email}});
    if(User){
        if(bcrypt.compareSync(payload.password, User.password)){
            request.cookieAuth.set(User);
            // var token = jwt.sign({name: "Ramamoorthy Vaidyanathan"}, 'NeverShareYourSecret');
            // response.cookie('name', 'Auth')
            response(User)
        }
    }
    response({
        errror: "Invalid Email Address / Password "
    })
}

const logoutUser = async (request, response) => {
    const User = await Models.user.findOne({where: {id: request.state.cid.id}});
    if(User){
        request.cookieAuth.clear();
        redisClient.flushAll();
        response({
            message: "Logged out Successfully!!!"
        })
    }
    response({
        errror: "Error!!! Can't able to logout"
    })
}

const getAllMail = async (request, response) => {
    const allMails = await Models.user.findAll({
        attributes: ['email']
    })
    const emails = allMails.map(item => item.dataValues.email)
    return emails
}



const deleteAccount = async (request, response) => {
    const payload = request.payload;
    const movie = await Models.movie.destroy({where: {UserId: request.params.accId}})
    const User = await Models.user.destroy({where: {id: request.params.accId}});
    request.cookieAuth.clear();
    response("Account deleted Successfully!!!1")
}






module.exports = { registerUser, loginUser, deleteAccount, logoutUser, getAllMail }