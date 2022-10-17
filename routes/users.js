const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/pending", function (req, res, next) {
  res.render("pending", { layout: "main" });
});

module.exports = router;
