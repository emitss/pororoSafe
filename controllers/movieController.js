const axios = require("axios");

const getMovies = async (req, res) => {
  const keyword = req.query.keyword || "popular";
  const apiKey = process.env.TMDB_API_KEY;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`);
    const movies = response.data.results.map((movie) => ({
      ...movie,
      suggestionScore: Math.floor(Math.random() * 100),
    }));

    // Ordenar por suggestionScore
    movies.sort((a, b) => b.suggestionScore - a.suggestionScore);

    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener películas" });
  }
};

module.exports = { getMovies };
