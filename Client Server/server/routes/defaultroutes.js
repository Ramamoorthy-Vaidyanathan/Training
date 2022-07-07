const { addController, basicGetController, paramsController } = require('../controllers/defaultcontroller')
const { addValidation } = require('../validation/defaultvalidation')
const path = require('path')


module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: basicGetController,
        config: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: basicGetController,
        config: {
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/addnum',
        handler: addController,
        config: {
            validate: {
                payload: addValidation
            }
        }
    }
]