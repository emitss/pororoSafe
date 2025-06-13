const express = require("express");
const router = express.Router();
const { addFavorite, getFavorites, deleteFavorite } = require("../controllers/favoriteController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/favorites", verifyToken, addFavorite);
router.get("/favorites", verifyToken, getFavorites);
router.delete("/favorites/:id", verifyToken, deleteFavorite);

module.exports = router;
