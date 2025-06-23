const { getMovies } = require("../services/moviesService");
const { InvalidCredentialsError } = require("../services/errors");
const { validateMovieData } = require("../utils/validateMovieData");

const getMoviesEndpoint = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const validation = validateMovieData({ keyword });
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const movies = await getMovies(keyword);
    res.status(200).json(movies);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    //error desconocido
    console.error("Error inesperado en getMovies:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { getMoviesEndpoint };
