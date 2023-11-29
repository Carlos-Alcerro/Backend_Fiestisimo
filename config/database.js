const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.HOST,
  port: process.env.PORT_BASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: true,
});

module.exports = sequelize;