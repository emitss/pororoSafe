const fs = require("fs").promises;
const bcrypt = require("bcryptjs");
//auth
const jwt = require("jsonwebtoken");
const { validateRegisterData } = require("./utils/validateRegisterData");
const USERS_FILE = "./data/users.txt";
//auth
const JWT_SECRET = process.env.JWT_SECRET || "claveSecreta123";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2h";

const registerUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const validation = validateRegisterData({ email, firstName, lastName, password });
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    // Leer archivo de usuarios o inicializar array vacío
    let users = [];
    try {
      const data = await fs.readFile(USERS_FILE, "utf8");
      users = data ? JSON.parse(data) : [];
    } catch (err) {
      if (err.code !== "ENOENT") throw err; // Si no es "archivo no encontrado", relanza el error
    }

    // Verificar si el email ya está registrado
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = { email, firstName, lastName, password: hashedPassword };
    users.push(newUser);

    // Guardar usuarios actualizados
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ✅ Login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  try {
    // Verificamos si el archivo existe
    try {
      await fs.access(USERS_FILE); // Lanza error si no existe
    } catch (err) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Leemos el archivo de forma asíncrona
    const content = await fs.readFile(USERS_FILE, "utf-8");

    if (!content.trim()) {
      return res.status(400).json({ message: "No hay usuarios registrados" });
    }

    let users;
    try {
      users = JSON.parse(content);
    } catch (err) {
      return res.status(500).json({
        message: "El archivo de usuarios está corrupto",
        error: err.message,
      });
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Generar token
    const payload = { email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
