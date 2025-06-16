const axios = require("axios"); //para solicitudes HTTP

const getMovies = async (req, res) => {
  //se obtiene la palabra clave de búsqueda desde query params, por defecto usamos popular
  const keyword = req.query.keyword || "popular";

  //se obtiene la API key de TMDB desde las variables de entorno
  const apiKey = process.env.TMDB_API_KEY;

  try {
    //solicitud GET a la API de TMDB buscando películas con la keyword
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`);

    //se obtienen los resultados y le agregamos un "suggestionScore" aleatorio a cada una
    const movies = response.data.results.map((movie) => ({
      ...movie,
      suggestionScore: Math.floor(Math.random() * 100),
    }));

    //se ordenan según suggestionScore
    movies.sort((a, b) => b.suggestionScore - a.suggestionScore);

    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener películas" });
  }
};

module.exports = { getMovies };
