const express = require("express");
const router = express.Router();

const { register, login, getMe } = require("../controllers/authController");
const protect = require("../middlewares/protect");
const validate = require("../middlewares/validate");
const {
  loginUserSchema,
  registerUserSchema,
} = require("../validators/authValidation");

router.post("/register", validate(registerUserSchema), register);
router.post("/login", validate(loginUserSchema), login);
router.get("/me", protect, getMe);

module.exports = router;
