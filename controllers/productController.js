const Product = require("../models/Product");
const AppError = require("../errors/AppError");
const asyncHandler = require("../middlewares/asyncHandler");
const money = require("../utils/money");

exports.getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const skip = (page - 1) * limit;
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("createdBy", "name email");

  const total = await Product.countDocuments();

  const formattedProducts = products.map((product) => ({
    ...product.toObject(),
    price: money.fromCents(product.price),
  }));
  res.status(200).json({
    success: true,
    count: products.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: formattedProducts,
  });
});

exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw AppError.notFound("Product not found");
  }
  res.status(200).json({
    success: true,
    data: { ...product.toObject(), price: money.fromCents(product.price) },
  });
});

exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    ...req.body,
    price: money.toCents(req.body.price),
    createdBy: req.user._id,
  });
  res.status(201).json({
    success: true,
    data: { ...product.toObject(), price: money.fromCents(product.price) },
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };

  if (updateData.price !== undefined) {
    updateData.price = money.toCents(updateData.price);
  }
  const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw AppError.notFound("Product not found");
  }
  res.status(200).json({
    success: true,
    data: { ...product.toObject(), price: money.fromCents(product.price) },
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw AppError.notFound("Product not found");
  }
  res.status(200).json({
    success: true,
    message: "Product was deleted",
  });
});
