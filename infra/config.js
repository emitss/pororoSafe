require("dotenv").config(); // Carga las variables del .env

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};
