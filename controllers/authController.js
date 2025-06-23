const authService = require("../services/authService");
const { EmailAlreadyInUseError, EmptyFieldsError, UserNotFoundError, InvalidCredentialsError } = require("../services/errors");

const { validateRegisterData } = require("../utils/validateRegisterData"); //para validar los datos del registro

const registerUserEndpoint = async (req, res) => {
  try {
    //vallidacion datos de registro(utils)
    const { email, firstName, lastName, password } = req.body;
    const validation = validateRegisterData({ email, firstName, lastName, password });

    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const message = await authService.registerUser({ email, firstName, lastName, password });
    res.status(201).json({ message });
  } catch (error) {
    if (error instanceof EmailAlreadyInUseError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error("Error inesperado al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const loginUserEndpoint = async (req, res) => {
  try {
    //validacion email y contra
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }
    const token = await authService.loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof UserNotFoundError || error instanceof InvalidCredentialsError) {
      return res.status(401).json({ error: error.message });
    }
    console.error("Error inesperado al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { registerUserEndpoint, loginUserEndpoint };
