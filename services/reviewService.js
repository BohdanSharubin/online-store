const Review = require("../models/Review");
const AppError = require("../errors/AppError");

exports.createReview = async (data, userId, productId) => {
  return await Review.create({
    ...data,
    user: userId,
    product: productId,
  });
};

exports.getReviewsByProduct = async (productId) => {
  return await Review.find({ product: productId }).populate("user", "name");
};

exports.deleteReview = async (reviewId, currentUser) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw AppError.notFound("Review is not found");
  }
  if (
    review.user.toString() !== currentUser._id.toString() &&
    currentUser.role !== admin
  ) {
    throw AppError.forbidden("You are not allowed to delete this review");
  }
  await review.deleteOne();
  return review;
};
