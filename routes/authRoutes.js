const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  logout,
} = require("../controllers/authController");
const protect = require("../middlewares/protect");
const validate = require("../middlewares/validate");
const {
  loginUserSchema,
  registerUserSchema,
} = require("../validators/authValidation");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Sign up for new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *                 description: Username (at least 3 characters)
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@example.com
 *                 description: Unique email
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *                 description: Password (at least 6 characters)
 *               confirmPassword:
 *                 type: string 
 *                 format: password
 *                 example: password123
 *                 description: Matches password
 *     responses:
 *       201:
 *         description: User was successfully sign up, token was set up in Cookie
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
 *                       example: John
 *                     email:
 *                       type: string
 *                       example: test@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *                   
 *       409:
 *         description: User with such email already exists
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
 *                   example: User with this email already exists
 *                 statusCode: 
 *                   type: number
 *                   example: 409
 */
router.post("/register", validate(registerUserSchema), register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Sign in for existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@example.com
 *                 description: Unique email
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *                 description: Password (at least 6 characters)
 *     responses:
 *       200:
 *         description: User was successfully sign in, token was set up in Cookie
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
 *                       example: John
 *                     email:
 *                       type: string
 *                       example: test@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *       400:
 *         description: Validation error (invalid email or password)
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
 *                   example: Wrong email or password
 *                 statusCode: 
 *                   type: number
 *                   example: 400
 */
router.post("/login", validate(loginUserSchema), login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Retrieving information about current authorized user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User authorized and we get information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64a7c5b3f1d2c34a8c8b4567
 *                     name:
 *                       type: string
 *                       example: John
 *                     email:
 *                       type: string
 *                       example: test@example.com
 *                     role:
 *                       type: string
 *                       example: user
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
 */
router.get("/me", protect, getMe);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Retrieving information about current authorized user
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User authorized and we get information
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
 *                   example: "Logout completed"
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
 */
router.post("/logout", protect, logout);

module.exports = router;
