const asyncHandler = require("../middlewares/asyncHandler");
const productService = require("../services/productService");

exports.getAllProducts = asyncHandler(async (req, res) => {
  const { formattedProducts, total, page, limit } =
    await productService.getAllProducts(req.query);
  res.status(200).json({
    success: true,
    count: formattedProducts.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: formattedProducts,
  });
});

exports.getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body, req.user._id);
  res.status(201).json({
    success: true,
    data: product,
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(
    req.params.id,
    req.body,
    req.user,
  );
  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product was deleted",
  });
});
