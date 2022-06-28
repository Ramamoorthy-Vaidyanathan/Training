const Models = require('../models/index')
const bcrypt = require('bcrypt')


const registerUser = async (request, response) => {
    const payload = request.payload;
    payload["password"] = bcrypt.hashSync(payload.password, 10)
    const Theater = await Models.user.create(payload)
    response(Theater);
}

const loginUser = async (request, response) => {
    const payload = request.payload;
    const user = await Models.user.findOne({where: {email: payload.email}});
    if(user){
        if(bcrypt.compareSync(payload.password, user.password)){
            response({
                message: "Login Successfull"
            })
        }
    }
    response({
        errror: "Invalid Email Address / Password "
    })
}

module.exports = { registerUser, loginUser }