const { searchMovies } = require("../infra/theMovieDB/movieRepository");

const getMoviesService = async (keyword) => {
  try {
    const movies = await searchMovies(keyword);
    console.log(`TMDB devolvió ${movies.length} películas para:`, keyword);
    //agregamos un score aleatorio y ordenamos
    const scored = movies.map((movie) => ({
      ...movie,
      suggestionScore: Math.floor(Math.random() * 100),
    }));

    scored.sort((a, b) => b.suggestionScore - a.suggestionScore);

    return {
      status: 200,
      body: scored,
    };
  } catch (error) {
    console.error("Error en getMoviesService:", error.message);
    return {
      status: 500,
      body: { error: "No se pudieron obtener películas desde TMDB" },
    };
  }
};

module.exports = { getMoviesService };
