require('dotenv').config();

module.exports = {
  develloped: {
    username: "intro_user",
    password: "intro_user",
    
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
