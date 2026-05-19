const reviewService = require("../services/reviewService");
const asyncHandler = require("../middlewares/asyncHandler");

exports.getReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getReviewsByProduct(req.params.id);
  res.status(200).json({
    success: true,
    data: reviews,
  });
});

exports.createReview = asyncHandler(async (req, res) => {
  const review = await reviewService.createReview(
    req.validated.body,
    req.user._id,
    req.params.id,
  );
  res.status(201).json({
    success: true,
    data: review,
  });
});

exports.deleteReview = asyncHandler(async (req, res) => {
  await reviewService.deleteReview(req.params.id, req.user);
  res.status(200).json({
    success: true,
    message: "Review was deleted",
  });
});
