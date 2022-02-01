const database = require('../database');
const {
    Model,
    DataTypes
} = require('sequelize');

class List extends Model {};

List.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    position: {
        type: DataTypes.INTEGER,
        defaultValue:0,
        validate: {
            isInt: true,
            min:0
        }
    },
}, {
    sequelize: database,
    tableName: "list"
});

module.exports = List;