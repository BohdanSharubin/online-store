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

router.get("/", getAllProducts);
router.get("/:id", getProduct);

router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);

router.delete("/:id", protect, restrictTo("admin"), deleteProduct);

module.exports = router;
