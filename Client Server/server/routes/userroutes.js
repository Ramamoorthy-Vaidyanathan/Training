const { registerUser, loginUser, logoutUser, deleteAccount} = require('../controllers/usercontroller')
const { loginValidation } = require('../validation/defaultvalidation')



module.exports = [
    {
        method: 'POST',
        path: '/register',
        handler: registerUser,
        config: {
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: loginUser,
        config: {
            validate: {
                payload: loginValidation
            },
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/logout',
        handler: logoutUser,
    },
    {
        method: 'DELETE',
        path: '/delete-account/{accId}',
        handler: deleteAccount,
    }
]