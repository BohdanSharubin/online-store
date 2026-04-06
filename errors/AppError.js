class AppError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static badRequest(message = "Bad request", errors = null) {
    return new AppError(400, message, errors);
  }

  static serverError(message = "Server error") {
    return new AppError(500, message);
  }

  static conflict(message) {
    return new AppError(409, message);
  }

  static unauthorized(message) {
    return new AppError(401, message);
  }

  static forbidden(message) {
    return new AppError(403, message);
  }

  static notFound(message) {
    return new AppError(404, message);
  }
}

module.exports = AppError;
