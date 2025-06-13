// define las rutas y a que controlador apunta
const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authController");
//const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
//router.post("/login", loginUser);

module.exports = router;
