const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model {}

Vote.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primnaryKey: true,
    },
    user_id: {
        references: {
            model: 'user',
            key: 'id',
        }
    },
    post_id: {
        references: {
            model: 'post',
            key: 'id',
        }
    },
},
{
    sequelize,
    timeStamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'vote',
});

module.exports = Vote;