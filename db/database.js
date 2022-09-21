require('dotenv').config();

module.exports = {
  development: {
    username: "intro_user",
    password: "intro_user",
    database: "onlineMarket",
    host: "http://localhost:3000/",
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {rejectUnauthorized: false}
    }
  },
};
