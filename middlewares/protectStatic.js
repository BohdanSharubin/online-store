const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");

const protectStatic = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      return res.redirect("/login.html");
    }
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.redirect("/login.html");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.redirect("/login.html");
  }
  req.user = user;
  next();
};

module.exports = protectStatic;
