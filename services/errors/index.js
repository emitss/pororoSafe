class UserNotFoundError extends Error {
  constructor(email) {
    super(`No se encontró un usuario con el email ${email}`);
    this.name = "UserNotFoundError";
  }
}

class EmptyFieldsError extends Error {
  constructor(message = "Faltan campos requeridos") {
    super(message);
    this.name = "EmptyFieldsError";
  }
}

class EmailAlreadyInUseError extends Error {
  constructor(email) {
    super(`El email ${email} ya está registrado`);
    this.name = "EmailAlreadyInUseError";
  }
}

class InvalidCredentialsError extends Error {
  constructor() {
    super("Credenciales inválidas");
    this.name = "InvalidCredentialsError";
  }
}

class MovieAlreadyInFavoritesError extends Error {
  constructor(movieId) {
    super(`La película con ID ${movieId} ya está en favoritos`);
    this.name = "MovieAlreadyInFavoritesError";
  }
}

class FavoriteMovieNotFoundError extends Error {
  constructor(movieId) {
    super(`No se encontró la película con ID ${movieId} en favoritos`);
    this.name = "FavoriteMovieNotFoundError";
  }
}
class UserHasNoFavoritesError extends Error {
  constructor(email) {
    super(`El usuario con email ${email} no tiene películas favoritas`);
    this.name = "UserHasNoFavoritesError";
  }
}

class ExternalApiError extends Error {
  constructor() {
    super(`Error al comunicarse con el servicio externo`);
    this.name = "ExternalApiError";
  }
}

module.exports = {
  EmptyFieldsError,
  UserNotFoundError,
  EmailAlreadyInUseError,
  InvalidCredentialsError,
  MovieAlreadyInFavoritesError,
  FavoriteMovieNotFoundError,
  UserHasNoFavoritesError,
  ExternalApiError,
};
