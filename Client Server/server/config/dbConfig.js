const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('movie_booking', 'ram', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports = {sequelize, DataTypes, Op};