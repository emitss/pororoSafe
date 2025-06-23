const { getMovies } = require("../services/moviesService");
const BaseError = require("../services/errors/BaseError");

const getMoviesEndpoint = async (req, res) => {
  try {
    const keyword = req.query.keyword || "popular";
    const movies = await getMovies(keyword);
    res.status(200).json(movies);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    //error desconocido
    console.error("Error inesperado en getMovies:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { getMoviesEndpoint };
