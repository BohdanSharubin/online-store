const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncHandler");
const authService = require("../services/authService");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 1000,
};

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  const token = generateToken(user._id, user.role);
  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = asyncHandler(async (req, res) => {
  const user = await authService.loginUser(req.body);
  const token = generateToken(user._id, user.role);
  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 0 });
  res.status(200).json({
    success: true,
    message: "Logout completed",
  });
});
