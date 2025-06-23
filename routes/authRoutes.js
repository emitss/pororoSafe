const express = require("express");
const router = express.Router();
const { registerUserEndpoint, loginUserEndpoint } = require("../controllers/authController");

router.post("/register", registerUserEndpoint);
router.post("/login", loginUserEndpoint);

module.exports = router;
