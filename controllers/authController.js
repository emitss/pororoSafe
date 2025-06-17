const fs = require("fs").promises;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRegisterData } = require("../utils/validateRegisterData"); //funcion que valida los datos de registro

const USERS_FILE = "./data/users.txt";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2h";

//funcion para registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  //validacion de campos
  const validation = validateRegisterData({ email, firstName, lastName, password });
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    //leer el archivo de usuarios o usar un array vacío si no existe
    let users = [];
    try {
      const data = await fs.readFile(USERS_FILE, "utf8");
      users = data ? JSON.parse(data) : [];
    } catch (err) {
      //si el error no es "archivo no encontrado", se relanza
      if (err.code !== "ENOENT") throw err;
    }

    //verificar si el email ya esta registrado
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    //encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    //crear el nuevo usuario
    const newUser = { email, firstName, lastName, password: hashedPassword };
    users.push(newUser);

    //guardar la lista actualizada en el archivo
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//funcion para loguear un usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //validar los campos
  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  try {
    //verificar si el archivo existe
    try {
      await fs.access(USERS_FILE); //error si no existe
    } catch (err) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    //leer el archivo de usuarios
    const content = await fs.readFile(USERS_FILE, "utf-8");

    if (!content.trim()) {
      return res.status(400).json({ message: "No hay usuarios registrados" });
    }

    let users;
    try {
      users = JSON.parse(content);
    } catch (err) {
      //error si el JSON es inválido
      return res.status(500).json({
        message: "El archivo de usuarios está corrupto",
        error: err.message,
      });
    }

    //buscar el usuario por email
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    //comparar la contraseña ingresada con la encriptada
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    //creamos el JWT si todo OK
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
