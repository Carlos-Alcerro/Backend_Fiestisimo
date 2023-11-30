const { Sequelize } = require('sequelize');
const dotenv=require("dotenv");

const sequelize = new Sequelize({
  dialect: 'postgres',
<<<<<<< HEAD
=======

>>>>>>> 2884b77e0ea14003a01171204403e1bbfa4ee015
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: true,
});

module.exports = sequelize;