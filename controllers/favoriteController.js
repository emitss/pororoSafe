const { addFavorite, getFavorites, deleteFavorite } = require("../services/favoritesService");
const { MovieAlreadyInFavoritesError, FavoriteMovieNotFoundError, UserHasNoFavoritesError } = require("../services/errors");
const { validateFavoriteData } = require("./validations/validateFavoriteData");

const addFavoriteEndpoint = async (req, res) => {
  try {
    //validacion de datos de favoritos(utils)
    const movie = req.body;
    const validation = validateFavoriteData({ movie });
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const message = await addFavorite(req.user.email, movie);
    res.status(201).json({ message });
  } catch (error) {
    if (error instanceof MovieAlreadyInFavoritesError) {
      return res.status(400).json({ error: error.message });
    }

    console.error("Error inesperado al agregar favorito:", error);
    res.status(500).send();
  }
};

const getFavoritesEndpoint = async (req, res) => {
  try {
    const { scoredFavorites } = await getFavorites(req.user.email);
    res.status(200).json(scoredFavorites);
  } catch (error) {
    if (error instanceof UserHasNoFavoritesError) {
      return res.status(204).send();
    }

    console.error("Error al obtener favoritos:", error);
    res.status(500).send();
  }
};

const deleteFavoriteEndpoint = async (req, res) => {
  try {
    const movieId = req.params.id;

    if (!movieId) {
      return res.status(400).json({ error: "ID de película no proporcionado" });
    }

    const message = await deleteFavorite(req.user.email, movieId);
    res.status(200).json({ message });
  } catch (error) {
    if (error instanceof FavoriteMovieNotFoundError || error instanceof UserHasNoFavoritesError) {
      return res.status(400).json({ error: "No se encuentra la pelicula entre los favoritos" });
    }

    console.error("Error al eliminar favorito:", error);
    res.status(500).send();
  }
};

module.exports = { addFavoriteEndpoint, getFavoritesEndpoint, deleteFavoriteEndpoint };
