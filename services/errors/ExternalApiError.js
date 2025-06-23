const BaseError = require("./BaseError");

class ExternalApiError extends BaseError {
  constructor(message = "Error al comunicarse con el servicio externo") {
    super(message, 592);
  }
}

module.exports = ExternalApiError;
