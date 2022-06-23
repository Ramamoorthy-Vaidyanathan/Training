const { addController, basicGetController, paramsController } = require('../controllers/defaultcontroller')
const { paramsValidation, addValidation} = require('../validation/defaultvalidation')


module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: basicGetController
    },
    {
        method: 'GET',
        path: '/{name}',
        handler: paramsController,
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