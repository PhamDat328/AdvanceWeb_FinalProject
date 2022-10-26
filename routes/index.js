const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express", layout: "main" });
});
router.get("/pending", function(req, res, next) {
    res.render("pending", { title: "Express", layout: "main" });
});

router.get("/login", function(req, res, next) {
    res.render("login", { title: "Express", layout: "blankLayout" });
});

module.exports = router;