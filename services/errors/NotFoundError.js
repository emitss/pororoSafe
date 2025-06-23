const BaseError = require("./BaseError");

class NotFoundError extends BaseError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

module.exports = NotFoundError;
