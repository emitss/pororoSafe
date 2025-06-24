function validateFavoriteData(movie) {
  if (!movie || !movie.id || !movie.title) {
    return { valid: false, error: "Película inválida: se requiere id y título" };
  }
  return { valid: true };
}

module.exports = { validateFavoriteData };
