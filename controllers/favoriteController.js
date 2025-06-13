const fs = require("fs").promises;
const FAVORITES_FILE = "./data/favoritos.txt";

// POST /api/favorites – Agregar una película a favoritos
const addFavorite = async (req, res) => {
  const movie = req.body;

  if (!movie || !movie.id) {
    return res.status(400).json({ error: "Datos de película inválidos" });
  }

  try {
    let favorites = [];
    try {
      const data = await fs.readFile(FAVORITES_FILE, "utf8");
      favorites = data ? JSON.parse(data) : [];
    } catch (err) {
      if (err.code !== "ENOENT") throw err; // Crear archivo si no existe
    }

    // Agregar la fecha actual
    movie.addedAt = new Date().toISOString();

    favorites.push(movie);
    await fs.writeFile(FAVORITES_FILE, JSON.stringify(favorites, null, 2));

    res.status(201).json({ message: "Película agregada a favoritos" });
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    res.status(500).json({ error: "Error interno al guardar favorito" });
  }
};

// GET /api/favorites – Obtener la lista de películas favoritas
const getFavorites = async (req, res) => {
  try {
    const data = await fs.readFile(FAVORITES_FILE, "utf8");
    const favorites = data ? JSON.parse(data) : [];

    // Agregar campo suggestionForTodayScore aleatorio a cada una
    const enriched = favorites.map((movie) => ({
      ...movie,
      suggestionForTodayScore: Math.floor(Math.random() * 100),
    }));

    // Ordenar por suggestionForTodayScore descendente
    enriched.sort((a, b) => b.suggestionForTodayScore - a.suggestionForTodayScore);

    res.json(enriched);
  } catch (error) {
    if (error.code === "ENOENT") {
      return res.json([]); // Si el archivo no existe, devolver lista vacía
    }
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ error: "Error interno al leer favoritos" });
  }
};

module.exports = {
  addFavorite,
  getFavorites,
};
