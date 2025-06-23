const jwt = require("jsonwebtoken");
const config = require("../infra/config");

//verifica la validez del token enviado en los headers
const authenticateToken = (req, res, next) => {
  //extrae el encabezado de autorización (Bearer TOKEN)
  const authHeader = req.headers["authorization"];

  //si existe, se queda solo con el token
  const token = authHeader && authHeader.split(" ")[1];

  //si no, no está autorizado
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  //verificamos si el token es valido usando la clave secreta
  jwt.verify(token, config.getJwtSecret(), (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
