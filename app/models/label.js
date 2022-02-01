const database = require('../database');
const {
    Model,
    DataTypes
} = require('sequelize');

class Label extends Model {};

Label.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    color: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize: database,
    tableName: "label"
});

module.exports = Label;