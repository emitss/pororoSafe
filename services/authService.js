const bcrypt = require("bcryptjs"); //para hashear y comparar contraseñas
const jwt = require("jsonwebtoken"); //para generar tokens de autenticación
const config = require("../infra/config");
const { readUsers, writeUsers } = require("../infra/persistence/userRepository"); //interaccion con users.txt
//manejo de errores
const { EmailAlreadyInUseError, UserNotFoundError, InvalidCredentialsError } = require("./errors");

const registerUser = async ({ email, firstName, lastName, password }) => {
  const users = await readUsers();
  if (users.find((u) => u.email === email)) {
    throw new EmailAlreadyInUseError(email);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, firstName, lastName, password: hashedPassword };

  await writeUsers([...users, newUser]);

  return "Usuario registrado con éxito";
};

const loginUser = async ({ email, password }) => {
  const users = await readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new UserNotFoundError(email);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new InvalidCredentialsError();
  }

  const token = jwt.sign({ email: user.email }, config.getJwtSecret(), { expiresIn: config.getJwtExpiresIn() });

  return token;
};

module.exports = { registerUser, loginUser };
