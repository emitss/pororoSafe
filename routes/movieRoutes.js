const express = require("express");
const router = express.Router();
const { getMovies } = require("../controllers/movieController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/movies", authenticateToken, getMovies);

module.exports = router;
