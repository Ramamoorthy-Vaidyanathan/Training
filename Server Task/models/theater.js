const {sequelize, DataTypes} = require('../config/dbConfig');

const Theater = sequelize.define('Theater', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    theater_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },  
})

Theater.createAssociation = (modelObj) => {
    Theater.belongsToMany(modelObj.movie, {through: "Movie_Theater"})
}


module.exports = Theater