const { readFavorites, writeFavorites } = require("../infra/persistence/favoriteRepository");

//agrega una peli a favoritos
const addFavoriteService = async (userEmail, movie) => {
  if (!movie || !movie.id || !movie.title) {
    return { status: 400, body: { message: "Película inválida" } };
  }

  const allFavorites = await readFavorites();

  let userData = allFavorites.find((entry) => entry.email === userEmail);
  if (!userData) {
    userData = { email: userEmail, favorites: [] };
    allFavorites.push(userData);
  }

  const alreadyAdded = userData.favorites.some((fav) => String(fav.id) === String(movie.id));
  if (alreadyAdded) {
    return { status: 400, body: { message: "Película ya está en favoritos" } };
  }

  movie.addedAt = new Date().toISOString();
  userData.favorites.push(movie);

  await writeFavorites(allFavorites);

  return { status: 201, body: { message: "Película agregada a favoritos" } };
};

//obtiene la lista de favoritos ordenada
const getFavoritesService = async (userEmail) => {
  const allFavorites = await readFavorites();
  const userData = allFavorites.find((entry) => entry.email === userEmail);
  const userFavorites = userData ? userData.favorites : [];

  const scoredFavorites = userFavorites.map((movie) => ({
    ...movie,
    suggestionForTodayScore: Math.floor(Math.random() * 100),
  }));

  scoredFavorites.sort((a, b) => b.suggestionForTodayScore - a.suggestionForTodayScore);
  return { status: 200, body: scoredFavorites };
};

//elimina una peli de favoritos
const deleteFavoriteService = async (userEmail, movieId) => {
  const allFavorites = await readFavorites();

  const userData = allFavorites.find((entry) => entry.email === userEmail);
  if (!userData) {
    return { status: 404, body: { message: "Usuario sin favoritos" } };
  }

  const initialLength = userData.favorites.length;
  userData.favorites = userData.favorites.filter((fav) => String(fav.id) !== String(movieId));

  if (userData.favorites.length === initialLength) {
    return { status: 404, body: { message: "Película no encontrada en favoritos" } };
  }

  await writeFavorites(allFavorites);
  return { status: 200, body: { message: "Película eliminada de favoritos" } };
};

module.exports = {
  addFavoriteService,
  getFavoritesService,
  deleteFavoriteService,
};
