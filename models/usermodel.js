const sequelize = require('../services/database.js')

const user = sequelize.sequelize.define('user', {
    name: {
        type: sequelize.Sequelize.STRING
    }
    // password: {
    //     type: sequelize.Sequelize.STRING
    // }
    },
    {
        timestamps: false
    }
);

module.exports = user;