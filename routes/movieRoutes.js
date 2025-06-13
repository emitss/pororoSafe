const express = require("express");
const router = express.Router();
const { getMovies } = require("../controllers/movieController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/movies", verifyToken, getMovies);

module.exports = router;
