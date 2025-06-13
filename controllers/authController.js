const fs = require("fs").promises;
const bcrypt = require("bcryptjs");

const USERS_FILE = "./data/users.txt";

const registerUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
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

module.exports = { registerUser };
