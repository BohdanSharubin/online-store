const bcrypt = require("bcryptjs");
const User = require("../models/User");
const AppError = require("../errors/AppError");

exports.registerUser = async ({ name, email, password, confirmPassword }) => {
  if (!name || !email || !password || !password) {
    throw AppError.badRequest("All fields are required");
  } else if (password !== confirmPassword) {
    throw AppError.badRequest("Passwords are not matching");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw AppError.conflict("User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return user;
};

exports.loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw AppError.badRequest("Enter email and password");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw AppError.unauthorized("Wrong email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw AppError.unauthorized("Wrong email or password");
  }

  return user;
};
