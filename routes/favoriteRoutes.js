const express = require("express");
const router = express.Router();
const { addFavorite, getFavorites } = require("../controllers/favoriteController");

router.post("/", addFavorite);
router.get("/", getFavorites);

module.exports = router;
