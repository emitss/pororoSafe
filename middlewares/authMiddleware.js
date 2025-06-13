//Middleware para autenticar usuarios con token
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // opcional si más adelante manejás múltiples usuarios
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};
