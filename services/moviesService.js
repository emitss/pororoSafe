const { searchMovies } = require("../infra/theMovieDB/client");

//gestion de errores
const { InvalidCredentialsError, ExternalApiError } = require("./errors");

const getMovies = async (keyword) => {
  if (!keyword || typeof keyword !== "string") {
    throw new InvalidCredentialsError();
  }
  try {
    const movies = await searchMovies(keyword);

    //agregamos un score aleatorio y ordenamos
    return movies
      .map((movie) => ({
        ...movie,
        suggestionScore: Math.floor(Math.random() * 100),
      }))
      .sort((a, b) => b.suggestionScore - a.suggestionScore);
  } catch (error) {
    throw new ExternalApiError();
  }
};

module.exports = { getMovies };
