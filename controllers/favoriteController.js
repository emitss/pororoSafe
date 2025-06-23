const { addFavorite, getFavorites, deleteFavorite } = require("../services/favoritesService");
const BaseError = require("../services/errors/BaseError");

const addFavoriteEndpoint = async (req, res) => {
  try {
    const message = await addFavorite(req.user.email, req.body);
    res.status(201).json(message);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Error al agregar favorito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getFavoritesEndpoint = async (req, res) => {
  try {
    const { favorites } = await getFavorites(req.user.email);
    res.status(200).json(favorites);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const deleteFavoriteEndpoint = async (req, res) => {
  try {
    const message = await deleteFavorite(req.user.email, req.body);
    res.status(201).json(message);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Error al eliminar favorito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { addFavoriteEndpoint, getFavoritesEndpoint, deleteFavoriteEndpoint };
