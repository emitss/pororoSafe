const authService = require("../services/authService");
const BaseError = require("../services/errors/BaseError");

const registerUserEndpoint = async (req, res) => {
  try {
    //se llama al servicio que maneja la logica del registro
    const message = await authService.registerUser(req.body);
    res.status(201).json({ message });
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error("Error inesperado al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const loginUserEndpoint = async (req, res) => {
  try {
    //se llama al servicio que maneja la logica de login
    const token = await authService.loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error("Error inesperado al autenticar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { registerUserEndpoint, loginUserEndpoint };
