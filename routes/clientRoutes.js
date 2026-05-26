const express = require("express");
const router = express.Router();
const protectStatic = require("../middlewares/protectStatic");
const controller = require("../controllers/frontendController");
const path = require("path");

router.get("/", controller.mainPage);
router.get("/create", protectStatic, controller.createProduct);
router.get("/add-review", protectStatic, controller.addReview);
router.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
module.exports = router;
