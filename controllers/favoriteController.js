const fs = require("fs").promises;
const path = require("path");

const FAVORITES_FILE = path.join(__dirname, "..", "data", "favoritos.txt");

const readAllFavorites = async () => {
  try {
    const content = await fs.readFile(FAVORITES_FILE, "utf-8");
    return content ? JSON.parse(content) : []; //si el archivo esta vacio, devolver array vacio
  } catch (err) {
    if (err.code === "ENOENT") return []; //si el archivo no existe tmb
    throw err;
  }
};

const writeAllFavorites = async (allFavorites) => {
  await fs.writeFile(FAVORITES_FILE, JSON.stringify(allFavorites, null, 2)); // Guardado con formato legible
};

//agregar una película a los favoritos del usuario autenticado
const addFavorite = async (req, res) => {
  const movie = req.body; //obtenemos los datos de la película desde el body
  const userEmail = req.user.email; //obtenemos el email del usuario autenticado (JWT)

  //validacion
  if (!movie || !movie.id || !movie.title) {
    return res.status(400).json({ message: "Película inválida" });
  }

  try {
    const allFavorites = await readAllFavorites();

    //verificar si el usuario ya tiene una entrada en el archivo
    let userData = allFavorites.find((entry) => entry.email === userEmail);
    if (!userData) {
      //si no existe se crea
      userData = { email: userEmail, favorites: [] };
      allFavorites.push(userData);
    }

    //verificar si la película ya fue agregada
    const alreadyAdded = userData.favorites.some((fav) => String(fav.id) === String(movie.id));
    if (alreadyAdded) {
      return res.status(400).json({ message: "Película ya está en favoritos" });
    }

    //agregar la fecha en que se agregó a favoritos
    movie.addedAt = new Date().toISOString();
    userData.favorites.push(movie);

    await writeAllFavorites(allFavorites);
    res.status(201).json({ message: "Película agregada a favoritos" });
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//listar los favoritos del usuario autenticado
const getFavorites = async (req, res) => {
  const userEmail = req.user.email;

  try {
    const allFavorites = await readAllFavorites();
    const userData = allFavorites.find((entry) => entry.email === userEmail);

    const userFavorites = userData ? userData.favorites : [];

    //agregar un puntaje aleatorio temporal
    const scoredFavorites = userFavorites.map((movie) => ({
      ...movie,
      suggestionForTodayScore: Math.floor(Math.random() * 100),
    }));

    //ordenar por el puntaje de sugerencia
    scoredFavorites.sort((a, b) => b.suggestionForTodayScore - a.suggestionForTodayScore);

    res.json(scoredFavorites);
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//eliminar una pelicula de los favoritos del usuario
const deleteFavorite = async (req, res) => {
  const userEmail = req.user.email;
  const movieId = req.params.id; //id por parámetro de ruta

  try {
    const allFavorites = await readAllFavorites();

    const userData = allFavorites.find((entry) => entry.email === userEmail);
    if (!userData) {
      return res.status(404).json({ message: "Usuario sin favoritos" });
    }

    //verificar si se encontró alguna película para eliminar
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
