const axios = require("axios");
const { TMDB_API_KEY } = require("../config");

//
const searchMovies = async (keyword = "popular") => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: keyword,
      },
    });
    return response.data.results;
  } catch (error) {
    throw new Error("Error al consultar la API de TMDB");
  }
};

module.exports = { searchMovies };
