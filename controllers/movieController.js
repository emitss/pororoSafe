const { getMoviesService } = require("../services/movieService");

const getMovies = async (req, res) => {
  try {
    const keyword = req.query.keyword || "popular";
    const { status, body } = await getMoviesService(keyword);
    res.status(status).json(body);
  } catch (error) {
    console.error("Error en getMovies:", error);
    res.status(500).json({ error: "Error al obtener películas" });
  }
};

module.exports = { getMovies };
