const { getMovies } = require("../services/moviesService");
const { validateMovieData } = require("./validations/validateMovieData");

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
    //error desconocido
    console.error("Error inesperado en getMovies:", error);
    res.status(500).send();
  }
};

module.exports = { getMoviesEndpoint };
