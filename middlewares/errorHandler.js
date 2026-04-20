const AppError = require("../errors/AppError");

module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server error";
  let errors = err.errors;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name == "CastError") {
    statusCode = 400;
    message = "invalid id format";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired. Please log in again";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again";
  }
  console.error(`${new Date().toISOString()} : ${err}`);
  return res.status(statusCode).json({
    success: false,
    message,
    ...(Array.isArray(errors) && errors.length > 0 && {errors}),
    statusCode,
  });
};
