const {sequelize, DataTypes} = require('../config/dbConfig');

const Movie = sequelize.define('Movies', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gener: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    run_time: {
        type: DataTypes.STRING,
        allowNull: false
    }    
})

Movie.createAssociation = (modelObj) => {
    Movie.belongsToMany(modelObj.theater, {through: 'Movie_Theater'})
}

module.exports = Movie

