const {
    Sequelize
} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    define: {
        timestamps: false
    },
    logging: false
});

module.exports = sequelize;