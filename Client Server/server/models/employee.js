const {sequelize, DataTypes} = require('../config/dbConfig');

const Employee = sequelize.define('Employees', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },  
})


module.exports = Employee;