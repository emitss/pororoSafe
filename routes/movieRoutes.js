const express = require("express");
const router = express.Router();
const { getMovies } = require("../controllers/movieController");
//const authenticate = require("../middleware/authMiddleware");

router.get("/", getMovies);
//router.get("/", authenticate, getMovies);

module.exports = router;
