const database = require('../database');
const {
    Model,
    DataTypes
} = require('sequelize');

class Cardlabel extends Model {};

Cardlabel.init({

    card_id: {
        validate: {
            isIn: true,
            min: 0
        },
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    label_id: {
        type: DataTypes.INTEGER,
        validate: {
            isIn: true,
            min: 0
        },
    }

}, {
    sequelize: database,
    tableName: "card_has_label"
});



module.exports = Cardlabel;