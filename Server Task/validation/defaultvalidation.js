const Joi = require('joi')

const paramsValidation = {
    params: Joi.string()
}

const addValidation = {
    num1: Joi.number().required(),
    num2: Joi.number().required()
}

const loginValidation = {
    email: Joi.string().required(),
    password: Joi.string().required()
}

module.exports = { paramsValidation, addValidation, loginValidation }