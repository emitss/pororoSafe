const BaseError = require("./BaseError");

class UnauthorizedError extends BaseError {
  constructor(message = "No autorizado") {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;
