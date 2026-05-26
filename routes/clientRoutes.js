const express = require("express");
const router = express.Router();
const protectStatic = require("../middlewares/protectStatic");
const controller = require("../controllers/frontendController");

router.get("/", controller.mainPage);
router.get("/create", protectStatic, controller.createProduct);
router.get("/add-review", protectStatic, controller.addReview);
module.exports = router;
