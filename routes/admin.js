const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express", layout: "admin" });
});
router.route("/pending").get(adminController.getPending);
router.get("/activated", function (req, res) {
  res.render("activated", { layout: "admin" });
});
router.get("/locked", function (req, res) {
  res.render("locked", { layouts: "admin" });
});
router.get("/disable", function (req, res) {
  res.render("disable", { layouts: "admin" });
});
router.get("/transactionApproval", function (req, res) {
  res.render("transactionApproval", { layouts: "admin" });
});

module.exports = router;
