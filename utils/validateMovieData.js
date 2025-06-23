function validateMovieData({ keyword }) {
  if (!keyword || typeof keyword !== "string") {
    return { valid: false, error: "Palabra clave inválida" };
  }
  return { valid: true };
}

module.exports = { validateMovieData };
