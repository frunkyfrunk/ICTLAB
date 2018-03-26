
const dbconfig = require('../dbconfig')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbconfig.database, dbconfig.user, dbconfig.password, {
    host: dbconfig.host,
    dialect: 'mysql',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }   
});

module.exports = {Sequelize: Sequelize, sequelize: sequelize};