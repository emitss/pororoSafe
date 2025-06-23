const axios = require("axios");
const { getTmdbApiKey } = require("../config");

const searchMovies = async (keyword = "popular") => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: getTmdbApiKey(),
        query: keyword,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error al consultar la API de TMDB:", error.message);
    throw new Error("No se pudo obtener la información de películas.");
  }
};

module.exports = { searchMovies };
