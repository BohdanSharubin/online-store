const Product = require("../models/Product");
const AppError = require("../errors/AppError");
const money = require("../utils/money");

exports.getAllProducts = async ({ page, limit }) => {
  page = parseInt(page || 1);
  limit = parseInt(limit || 10);
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
  return { formattedProducts, total, limit, page };
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw AppError.notFound("Product not found");
  }
  return { ...product.toObject(), price: money.fromCents(product.price) };
};

exports.createProduct = async (data, userId) => {
  const product = await Product.create({
    ...data,
    price: money.toCents(data.price),
    createdBy: userId,
  });
  return { ...product.toObject(), price: money.fromCents(product.price) };
};

exports.updateProduct = async (id, data, currentUser) => {
  const product = await Product.findById(id);
  if (!product) {
    throw AppError.notFound("Product not found");
  } else if (
    product.createdBy.toString() === currentUser._id.toString() ||
    currentUser.role === "admin"
  )
    throw AppError.forbidden("You have no rights to update this product");

  if (data.price !== undefined) {
    data.price = money.toCents(data.price);
  }

  Object.assign(product, data);
  product.save();
  return { ...product.toObject(), price: money.fromCents(product.price) };
};

exports.deleteProduct = async (id) => {
  const product = Product.findByIdAndDelete(id);
  if (!product) {
    throw AppError.notFound("Product not found");
  }
  return product;
};
