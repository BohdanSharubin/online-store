const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../errors/AppError");
const asyncHandler = require("../middlewares/asyncHandler");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw AppError.unauthorized("Access denied. Token is missing");
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    throw AppError.unauthorized("User was not found");
  }
  req.user = user;
  next();
};

module.exports = protect;
