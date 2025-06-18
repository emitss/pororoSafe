//registrar y loguear usuarios
const bcrypt = require("bcryptjs"); //para hashear y comparar contraseñas
const jwt = require("jsonwebtoken"); //para generar tokens de autenticación
const { validateRegisterData } = require("../utils/validateRegisterData"); //para validar los datos del registro
const { readUsers, writeUsers } = require("../infra/persistence/userRepository"); //interaccion con users.txt

const registerUserService = async ({ email, firstName, lastName, password }) => {
  const validation = validateRegisterData({ email, firstName, lastName, password });
  if (!validation.valid) {
    return { status: 400, body: { error: validation.error } };
  }

  const users = await readUsers();
  if (users.find((u) => u.email === email)) {
    return { status: 400, body: { error: "El usuario ya está registrado" } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, firstName, lastName, password: hashedPassword };

  await writeUsers([...users, newUser]);

  return { status: 201, body: { message: "Usuario registrado con éxito" } };
};

const loginUserService = async ({ email, password }) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
  console.log("JWT Secret authService:", JWT_SECRET);
  console.log("JWT Expiration authService:", JWT_EXPIRES_IN);
  if (!email || !password) {
    return { status: 400, body: { message: "Email y contraseña son requeridos" } };
  }

  const users = await readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    return { status: 400, body: { message: "Credenciales inválidas" } };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { status: 400, body: { message: "Credenciales inválidas" } };
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { status: 200, body: { token } };
};

module.exports = { registerUserService, loginUserService };
