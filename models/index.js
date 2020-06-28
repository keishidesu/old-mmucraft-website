if (require.main === module) require('dotenv').config();
const Sequelize = require('sequelize');
const definitions = require('./definitions');

const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

let models = definitions.export(sequelize);
if (require.main === module)
  sequelize.sync();
else
  module.exports = models;