const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  host: process.env.HOST,
  port: process.env.PORT_BASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: true,
});

module.exports = sequelize;