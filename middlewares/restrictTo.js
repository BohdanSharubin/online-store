const AppError = require("../errors/AppError");
const asyncHandler = require("../middlewares/asyncHandler");

const restrictTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw AppError.forbidden("You have no rights for this action");
    }
    next();
  });
};

module.exports = restrictTo;
