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

/**
 * @swagger
 * /api/product/{productId}/reviews:
 *   get:
 *     summary: Retrieves all review for specific product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     responses:
 *       200:
 *         description: Retrives all reviews for specific product by product id
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
 *                     rating:
 *                       type: number
 *                       example: 2
 *                     comment:
 *                       type: string
 *                       example: This is the first comment
 *                     product:
 *                       type: string
 *                       example: 69f454574009b8c9203ef149
 *                     createdAt:
 *                       type: date
 *                       example: 2026-05-26T14:51:46.673Z
 *                     user:
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
 *         description: Product with such productId doesn't exist
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
router.get("/", getReviews);

/**
 * @swagger
 * /api/product/{productId}/reviews:
 *   post:
 *     summary: Creates new review for a product
 *     tags: [Reviews]
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
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: integer
 *                 format: int32
 *                 example: 2
 *                 description: Rating betweem 1 and 5
 *               content:
 *                 type: string
 *                 format: string
 *                 example: This is the comment
 *                 description: Review within 10 and 500 characters
 *     responses:
 *       201:
 *         description: Review was successfully created for the product
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
 *                     rating:
 *                       type: number
 *                       example: 2
 *                     comment:
 *                       type: string
 *                       example: This is the first comment
 *                     product:
 *                       type: string
 *                       example: 69f454574009b8c9203ef149
 *                     createdAt:
 *                       type: date
 *                       example: 2026-05-26T14:51:46.673Z
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 64a7c5b3f1d2c34a8c8b4567
 *                         name:
 *                           type: string
 *                           example: John
 *       400:
 *         description: Validation error (invalid rating or comment)
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
 *                       example: comment
 *                     error:
 *                       type: string
 *                       example: Comment is required
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
router.post("/", protect, validate(createReviewSchema), createReview);

/**
 * @swagger
 * /api/product/{productId}/reviews/{reviewId}:
 *   delete:
 *     summary: Delete review from the product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The review id
 *     responses:
 *       200:
 *         description: Review was successfully deleted from the product
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
 *                   example: Review was deleted
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
 *         description: Review with such reviewId not found
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
 *                   example: Review is not found
 *                 statusCode: 
 *                   type: number
 *                   example: 404            
 */
router.delete("/:id", protect, deleteReview);

module.exports = router;
