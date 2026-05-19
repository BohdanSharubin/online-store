const mongoose = require("mongoose");
const User = require("./User");
const Product = require("./Product");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "Rating must be integer value",
    },
    required: [true, "Rating is required"],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
    trim: true,
    minlength: 10,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Product,
    required: true,
  },
});

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
