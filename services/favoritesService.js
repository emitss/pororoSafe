const { readFavorites, writeFavorites } = require("../infra/persistence/favoriteRepository");

const BadRequestError = require("./errors/BadRequestError");
const NotFoundError = require("./errors/NotFoundError");

const addFavorite = async (userEmail, movie) => {
  if (!movie || !movie.id || !movie.title) {
    throw new BadRequestError("Película inválida");
  }

  const allFavorites = await readFavorites();
  let userData = allFavorites.find((entry) => entry.email === userEmail);
  if (!userData) {
    userData = { email: userEmail, favorites: [] };
    allFavorites.push(userData);
  }

  const alreadyAdded = userData.favorites.some((fav) => String(fav.id) === String(movie.id));
  if (alreadyAdded) {
    throw new BadRequestError("La película ya está en favoritos");
  }

  movie.addedAt = new Date().toISOString();
  userData.favorites.push(movie);

  await writeFavorites(allFavorites);

  return "Película agregada a favoritos";
};

const getFavorites = async (userEmail) => {
  const allFavorites = await readFavorites();
  const userData = allFavorites.find((entry) => entry.email === userEmail);
  const userFavorites = userData ? userData.favorites : [];

  const scoredFavorites = userFavorites.map((movie) => ({
    ...movie,
    suggestionForTodayScore: Math.floor(Math.random() * 100),
  }));

  scoredFavorites.sort((a, b) => b.suggestionForTodayScore - a.suggestionForTodayScore);

  return { scoredFavorites };
};

const deleteFavorite = async (userEmail, movieId) => {
  const allFavorites = await readFavorites();

  const userData = allFavorites.find((entry) => entry.email === userEmail);
  if (!userData) {
    throw new NotFoundError("Usuario sin favoritos");
  }

  const initialLength = userData.favorites.length;
  userData.favorites = userData.favorites.filter((fav) => String(fav.id) !== String(movieId));

  if (userData.favorites.length === initialLength) {
    throw new NotFoundError("Película no encontrada en favoritos");
  }

  await writeFavorites(allFavorites);
  return "Película eliminada de favoritos";
};

module.exports = {
  addFavorite,
  getFavorites,
  deleteFavorite,
};
