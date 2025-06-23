function validateMovieData({ keyword }) {
  //si keyword es null o undefined o string vacia
  if (keyword == null || keyword.trim() === "") {
    console.log("keyword es null o undefined");
    return { valid: false, error: "Palabra clave no proporcionada" };
  }

  console.log("keyword válida:", keyword);
  return { valid: true };
}

module.exports = { validateMovieData };
