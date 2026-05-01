const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../errors/AppError");
const asyncHandler = require("../middlewares/asyncHandler");

const protect = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      throw AppError.unauthorized("Access denied. Token is missing");
    }
  }
  
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw AppError.unauthorized("Token has expired. Please log in again");
    }
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw AppError.unauthorized("User was not found");
  }
  req.user = user;
  next();
};

module.exports = protect;
