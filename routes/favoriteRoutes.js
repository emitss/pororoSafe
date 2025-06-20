const express = require("express");
const router = express.Router();
const { addFavorite, getFavorites, deleteFavorite } = require("../controllers/favoriteController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post("/favorites", authenticateToken, addFavorite);
router.get("/favorites", authenticateToken, getFavorites);
router.delete("/favorites/:id", authenticateToken, deleteFavorite);

module.exports = router;
