function validateEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateRegisterData({ email, firstName, lastName, password }) {
  if (!email || !firstName || !lastName || !password) {
    return { valid: false, error: "Todos los campos son obligatorios" };
  }

  if (!validateEmail(email)) {
    return { valid: false, error: "Email inválido" };
  }

  if (password.length < 6) {
    return { valid: false, error: "La contraseña debe tener al menos 6 caracteres" };
  }

  return { valid: true };
}

module.exports = { validateRegisterData };
