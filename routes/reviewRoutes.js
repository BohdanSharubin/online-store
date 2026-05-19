const express = require("express");
const protect = require("../middlewares/protect");
const validate = require("../middlewares/validate");
const { createReviewSchema } = require("../validators/reviewValidation");
const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.get("/", getReviews);
router.post("/", protect, validate(createReviewSchema), createReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;
