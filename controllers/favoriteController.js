const fs = require("fs").promises;
const path = require("path");

const FAVORITES_FILE = path.join(__dirname, "..", "data", "favoritos.txt");

// Leer archivo completo
const readAllFavorites = async () => {
  try {
    const content = await fs.readFile(FAVORITES_FILE, "utf-8");
    return content ? JSON.parse(content) : [];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

// Escribir archivo completo
const writeAllFavorites = async (allFavorites) => {
  await fs.writeFile(FAVORITES_FILE, JSON.stringify(allFavorites, null, 2));
};

// Agregar favorito
const addFavorite = async (req, res) => {
  const movie = req.body;
  const userEmail = req.user.email;

  if (!movie || !movie.id || !movie.title) {
    return res.status(400).json({ message: "Película inválida" });
  }

  try {
    const allFavorites = await readAllFavorites();

    // Buscar entrada del usuario
    let userData = allFavorites.find((entry) => entry.email === userEmail);
    if (!userData) {
      userData = { email: userEmail, favorites: [] };
      allFavorites.push(userData);
    }

    const alreadyAdded = userData.favorites.some((fav) => String(fav.id) === String(movie.id));
    if (alreadyAdded) {
      return res.status(400).json({ message: "Película ya está en favoritos" });
    }

    movie.addedAt = new Date().toISOString();
    userData.favorites.push(movie);

    await writeAllFavorites(allFavorites);
    res.status(201).json({ message: "Película agregada a favoritos" });
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Listar favoritos del usuario autenticado
const getFavorites = async (req, res) => {
  const userEmail = req.user.email;

  try {
    const allFavorites = await readAllFavorites();
    const userData = allFavorites.find((entry) => entry.email === userEmail);

    const userFavorites = userData ? userData.favorites : [];

    const scoredFavorites = userFavorites.map((movie) => ({
      ...movie,
      suggestionForTodayScore: Math.floor(Math.random() * 100),
    }));

    scoredFavorites.sort((a, b) => b.suggestionForTodayScore - a.suggestionForTodayScore);

    res.json(scoredFavorites);
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
// Eliminar una película de favoritos
const deleteFavorite = async (req, res) => {
  const userEmail = req.user.email;
  const movieId = req.params.id;

  try {
    const allFavorites = await readAllFavorites();

    const userData = allFavorites.find((entry) => entry.email === userEmail);
    if (!userData) {
      return res.status(404).json({ message: "Usuario sin favoritos" });
    }

    const initialLength = userData.favorites.length;
    userData.favorites = userData.favorites.filter((fav) => String(fav.id) !== String(movieId));

    if (userData.favorites.length === initialLength) {
      return res.status(404).json({ message: "Película no encontrada en favoritos" });
    }

    await writeAllFavorites(allFavorites);
    res.json({ message: "Película eliminada de favoritos" });
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { addFavorite, getFavorites, deleteFavorite };
