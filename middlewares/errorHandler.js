const AppError = require("../errors/AppError");

module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name == "CastError") {
    statusCode = 400;
    message = "invalid id format";
  }
  console.error(`${new Date().toISOString()} : ${err}`);
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};
