const express = require("express");
const router = express.Router();
const reviewRouter = require("./reviewRoutes");

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

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Retrieves all products
 *     description: Fetches products with pagination and filter
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of products to retrieve
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: The category of products to retrieve
 *     responses:
 *       200:
 *         description: Retrives all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 currentPage: 
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64a7c5b3f1d2c34a8c8b4567
 *                     name:
 *                       type: string
 *                       example: Lenovo Slimpad
 *                     description:
 *                       type: string
 *                       example: This is the laptop
 *                     price:
 *                       type: number
 *                       example: 2
 *                     category:
 *                       type: string
 *                       example: Electronics
 *                     stock:
 *                       type: integer
 *                       example: 10
 *                     createdBy:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 64a7c5b3f1d2c34a8c8b4567
 *                         name:
 *                           type: string
 *                           example: John
 *                         
 *       400:
 *         description: Pagination or filtering is not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Data is not valid
 *                 statusCode: 
 *                   type: number
 *                   example: 400
 *                 errors:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                       example: page
 *                     message:
 *                       type: string
 *                       example: Page is not a number
 * 
 */
router.get("/", validate(paginationSchema, "query"), getAllProducts);

/**
 * @swagger
 * /api/product/{productId}:
 *   get:
 *     summary: Retrieves product
 *     description: Retrieves specific product by its id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     responses:
 *       200:
 *         description: Retrives product by product id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64a7c5b3f1d2c34a8c8b4567
 *                     name:
 *                       type: string
 *                       example: Lenovo Slimpad
 *                     description:
 *                       type: string
 *                       example: This is the laptop
 *                     price:
 *                       type: number
 *                       example: 2
 *                     category:
 *                       type: string
 *                       example: Electronics
 *                     stock:
 *                       type: integer
 *                       example: 10
 *                     createdBy:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 64a7c5b3f1d2c34a8c8b4567
 *                         name:
 *                           type: string
 *                           example: John
 *                         
 *       404:
 *         description: Product with such productId not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Product not found
 *                 statusCode: 
 *                   type: number
 *                   example: 404
 */
router.get("/:id", validate(idSchema, "params"), getProduct);

/**
 * @swagger
 * /api/product/{productId}:
 *   post:
 *     summary: Creates new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 format: string
 *                 example: Laptop
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 format: string
 *                 example: The laptop description
 *                 description: Some information about product
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 2.14
 *                 description: Price of the product
 *               category:
 *                 type: string
 *                 format: string
 *                 example: Electronics
 *                 description: The category of the product
 *               stock:
 *                 type: integer
 *                 format: int32
 *                 example: 2
 *                 description: Amount of the product
 *     responses:
 *       201:
 *         description: Retrives created product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64a7c5b3f1d2c34a8c8b4567
 *                     name:
 *                       type: string
 *                       example: Lenovo Slimpad
 *                     description:
 *                       type: string
 *                       example: This is the laptop
 *                     price:
 *                       type: number
 *                       example: 2
 *                     category:
 *                       type: string
 *                       example: Electronics
 *                     stock:
 *                       type: integer
 *                       example: 10
 *                     createdBy:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 64a7c5b3f1d2c34a8c8b4567
 *                         name:
 *                           type: string
 *                           example: John
 *       400:
 *         description: Validation error (invalid any of product field)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Data is not valid
 *                 statusCode: 
 *                   type: number
 *                   example: 400
 *                 errors:
 *                   type: object
 *                   properties:
 *                     field: 
 *                       type: string
 *                       example: name
 *                     error:
 *                       type: string
 *                       example: Name is required
 *       401:
 *         description: User is not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Access denied. Token is missing
 *                 statusCode: 
 *                   type: number
 *                   example: 401
 *                 
 */
router.post("/", protect, validate(createProductSchema), createProduct);

/**
 * @swagger
 * /api/product/{productId}:
 *   put:
 *     summary: Updates existinq product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 format: string
 *                 example: Laptop
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 format: string
 *                 example: The laptop description
 *                 description: Some information about product
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 2.14
 *                 description: Price of the product
 *               category:
 *                 type: string
 *                 format: string
 *                 example: Electronics
 *                 description: The category of the product
 *               stock:
 *                 type: integer
 *                 format: int32
 *                 example: 2
 *                 description: Amount of the product
 *     responses:
 *       200:
 *         description: Retrives created product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64a7c5b3f1d2c34a8c8b4567
 *                     name:
 *                       type: string
 *                       example: Lenovo Slimpad
 *                     description:
 *                       type: string
 *                       example: This is the laptop
 *                     price:
 *                       type: number
 *                       example: 2
 *                     category:
 *                       type: string
 *                       example: Electronics
 *                     stock:
 *                       type: integer
 *                       example: 10
 *                     createdBy:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 64a7c5b3f1d2c34a8c8b4567
 *                         name:
 *                           type: string
 *                           example: John
 *       400:
 *         description: Validation error (invalid any of product field)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Data is not valid
 *                 statusCode: 
 *                   type: number
 *                   example: 400
 *                 errors:
 *                   type: object
 *                   properties:
 *                     field: 
 *                       type: string
 *                       example: name
 *                     error:
 *                       type: string
 *                       example: Name is required
 *       401:
 *         description: User is not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Access denied. Token is missing
 *                 statusCode: 
 *                   type: number
 *                   example: 401
 *       403:
 *         description: User have no rights to do this operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: You have no rights to update this product
 *                 statusCode: 
 *                   type: number
 *                   example: 403            
 */
router.put(
  "/:id",
  protect,
  validate(idSchema, "params"),
  validate(updateProductSchema),
  updateProduct,
);

/**
 * @swagger
 * /api/product/{productId}:
 *   delete:
 *     summary: Deletes product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     responses:
 *       200:
 *         description: Product was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product was deleted
 *       401:
 *         description: User is not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Access denied. Token is missing
 *                 statusCode: 
 *                   type: number
 *                   example: 401
 * 
 *       403:
 *         description: User have no rights to do this action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: You are not allowed to delete this review
 *                 statusCode: 
 *                   type: number
 *                   example: 403    
 *       404:
 *         description: Product with such productId not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Product is not found 
 *                 statusCode: 
 *                   type: number
 *                   example: 404       
 */
router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  validate(idSchema, "params"),
  deleteProduct,
);

router.use("/:id/reviews", reviewRouter);

module.exports = router;
