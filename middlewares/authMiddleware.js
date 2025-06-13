//Middleware para autenticar usuarios con token
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "claveSecreta123";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // formato: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }

    req.user = user; // Guarda los datos del token en la request
    next();
  });
};

module.exports = authenticateToken;
