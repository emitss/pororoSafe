const authService = require("../services/authService");

//controlador que maneja la solicitud de registro de usuario
const registerUser = async (req, res) => {
  try {
    //se llama al servicio que maneja la logica del registro
    const message = await authService.registerUserService(req.body);
    res.status(201).json({ message });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

//controlador que maneja la solicitud de login de usuario
const loginUser = async (req, res) => {
  try {
    //se llama al servicio que maneja la logica de login
    const token = await authService.loginUserService(req.body);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
