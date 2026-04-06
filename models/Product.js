const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    maxLength: [300, "The description must be no more than 300 characters"],
  },
  price: {
    type: Number, // cents
    required: [true, "Price is required"],
    min: 0,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"], 
    min: 0
  }
});

module.exports = mongoose.model("Product", productSchema);