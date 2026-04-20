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
  idSchema,
  paginationSchema,
} = require("../validators/productValidation");

router.get("/", validate(paginationSchema, "query"), getAllProducts);
router.get("/:id", validate(idSchema, "params"), getProduct);

router.post("/", protect, validate(createProductSchema), createProduct);
router.put(
  "/:id",
  protect,
  validate(idSchema, "params"),
  validate(updateProductSchema),
  updateProduct,
);

router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  validate(idSchema, "params"),
  deleteProduct,
);

module.exports = router;
