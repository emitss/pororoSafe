const { addFavoriteService, getFavoritesService, deleteFavoriteService } = require("../services/favoriteService");

const addFavorite = async (req, res) => {
  try {
    const { status, body } = await addFavoriteService(req.user.email, req.body);
    res.status(status).json(body);
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getFavorites = async (req, res) => {
  try {
    const { status, body } = await getFavoritesService(req.user.email);
    res.status(status).json(body);
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const { status, body } = await deleteFavoriteService(req.user.email, req.params.id);
    res.status(status).json(body);
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { addFavorite, getFavorites, deleteFavorite };
