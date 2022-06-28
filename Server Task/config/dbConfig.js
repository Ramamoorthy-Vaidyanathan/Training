const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('movie_booking', 'ram', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = {sequelize, DataTypes};