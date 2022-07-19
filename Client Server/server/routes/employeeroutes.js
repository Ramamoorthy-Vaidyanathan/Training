const { getAllEmployees, postEmployee } = require('../controllers/employeecontroller')

module.exports = [
    {
        method: 'GET',
        path: '/employees',
        handler: getAllEmployees,
    },
    {
        method: 'POST',
        path: '/employee',
        handler: postEmployee,
    },
]