const Joi = require('joi')

const paramsValidation = {
    params: Joi.string()
}

const addValidation = {
    num1: Joi.number().required(),
    num2: Joi.number().required()
}

module.exports = { paramsValidation, addValidation }