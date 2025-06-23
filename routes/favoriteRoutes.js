const express = require("express");
const router = express.Router();
const { addFavoriteEndpoint, getFavoritesEndpoint, deleteFavoriteEndpoint } = require("../controllers/favoriteController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post("/favorites", authenticateToken, addFavoriteEndpoint);
router.get("/favorites", authenticateToken, getFavoritesEndpoint);
router.delete("/favorites/:id", authenticateToken, deleteFavoriteEndpoint);

module.exports = router;
