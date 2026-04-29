const express = require("express");
const router = express.Router();
const protectStatic = require("../middlewares/protectStatic");

router.get("/create.html", protectStatic, express.static("public"));

module.exports = router;
