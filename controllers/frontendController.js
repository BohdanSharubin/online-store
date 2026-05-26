const asyncHandler = require("../middlewares/asyncHandler");
const path = require("path");

exports.addReview = asyncHandler(async (req, res) => {
  const reviewPagePath = path.join(__dirname, "../private/add-review.html");
  res.sendFile(reviewPagePath);
});

exports.createProduct = asyncHandler(async (req, res) => {
  const createProductPagePath = path.join(__dirname, "../private/create.html");
  res.sendFile(createProductPagePath);
});

exports.mainPage = asyncHandler(async (req, res) => {
  const mainPagePath = path.join(__dirname, "../public/index.html");
  res.sendFile(mainPagePath);
});
