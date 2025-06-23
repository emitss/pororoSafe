function validateMovieData({ keyword }) {
  //si keyword es null o undefined o string vacia
  if (keyword == null || keyword.trim() === "") {
    return { valid: false, error: "Palabra clave no proporcionada" };
  }
  return { valid: true };
}

module.exports = { validateMovieData };
