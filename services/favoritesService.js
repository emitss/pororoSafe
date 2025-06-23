const { readFavorites, writeFavorites } = require("../infra/persistence/favoriteRepository");
const { MovieAlreadyInFavoritesError, FavoriteMovieNotFoundError, UserHasNoFavoritesError } = require("./errors");

const addFavorite = async (userEmail, movie) => {
  const allFavorites = await readFavorites();

  let userData = allFavorites.find((entry) => entry.email === userEmail);
  if (!userData) {
    userData = { email: userEmail, favorites: [] };
    allFavorites.push(userData);
  }

  const alreadyAdded = userData.favorites.some((fav) => String(fav.id) === String(movie.id));
  if (alreadyAdded) {
    throw new MovieAlreadyInFavoritesError(movie.id);
  }

  movie.addedAt = new Date().toISOString();
  userData.favorites.push(movie);

  await writeFavorites(allFavorites);

  return "Película agregada a favoritos";
};

const getFavorites = async (userEmail) => {
  const allFavorites = await readFavorites();
  const userData = allFavorites.find((entry) => entry.email === userEmail);

  if (!userData || userData.favorites.length === 0) {
    throw new UserHasNoFavoritesError(userEmail);
  }

  const scoredFavorites = userData.favorites.map((movie) => ({
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
    throw new UserHasNoFavoritesError(userEmail);
  }

  const initialLength = userData.favorites.length;
  userData.favorites = userData.favorites.filter((fav) => String(fav.id) !== String(movieId));

  if (userData.favorites.length === initialLength) {
    throw new FavoriteMovieNotFoundError(movieId);
  }

  await writeFavorites(allFavorites);
  return "Película eliminada de favoritos";
};

module.exports = {
  addFavorite,
  getFavorites,
  deleteFavorite,
};
