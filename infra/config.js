require("dotenv").config();

module.exports = {
  getJwtSecret: () => process.env.JWT_SECRET,
  getJwtExpiresIn: () => process.env.JWT_EXPIRES_IN,
  getTmdbApiKey: () => process.env.TMDB_API_KEY,
};
