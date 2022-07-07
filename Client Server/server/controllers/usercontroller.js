const Models = require('../models/index')
const bcrypt = require('bcrypt')
const { Op } = require('../config/dbConfig')
const jwt = require('jsonwebtoken')


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
            response(User)
        }
    }
    response({
        errror: "Invalid Email Address / Password "
    })
}

module.exports = { registerUser, loginUser }