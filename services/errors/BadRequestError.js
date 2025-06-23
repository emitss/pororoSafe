const BaseError = require("./BaseError");

class BadRequestError extends BaseError {
  constructor(message = "Solicitud incorrecta") {
    super(message, 400);
  }
}

module.exports = BadRequestError;
