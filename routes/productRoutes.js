const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/productController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");
const validate = require("../middlewares/validate");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/productValidation");

router.get("/", getAllProducts);
router.get("/:id", getProduct);

router.post("/", protect, validate(createProductSchema), createProduct);
router.put("/:id", protect, validate(updateProductSchema), updateProduct);

router.delete("/:id", protect, restrictTo("admin"), deleteProduct);

module.exports = router;
