const express = require("express");
const router = express.Router();
const { getMoviesEndpoint } = require("../controllers/movieController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/movies", authenticateToken, getMoviesEndpoint);

module.exports = router;
