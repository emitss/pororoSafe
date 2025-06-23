const bcrypt = require("bcryptjs"); //para hashear y comparar contraseñas
const jwt = require("jsonwebtoken"); //para generar tokens de autenticación
const config = require("../infra/config");
const { validateRegisterData } = require("../utils/validateRegisterData"); //para validar los datos del registro
const { readUsers, writeUsers } = require("../infra/persistence/userRepository"); //interaccion con users.txt
//manejo de errores
const UnauthorizedError = require("./errors/UnauthorizedError");
const BadRequestError = require("./errors/BadRequestError");

const registerUser = async ({ email, firstName, lastName, password }) => {
  const validation = validateRegisterData({ email, firstName, lastName, password });
  if (!validation.valid) {
    throw new BadRequestError(validation.error);
  }

  const users = await readUsers();
  if (users.find((u) => u.email === email)) {
    throw new BadRequestError("El usuario ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, firstName, lastName, password: hashedPassword };

  await writeUsers([...users, newUser]);

  return "Usuario registrado con éxito";
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new BadRequestError("Email y contraseña son requeridos");
  }

  const users = await readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new UnauthorizedError();
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new UnauthorizedError();
  }

  const token = jwt.sign({ email: user.email }, config.getJwtSecret(), { expiresIn: config.getJwtExpiresIn() });

  return token;
};

module.exports = { registerUser, loginUser };
