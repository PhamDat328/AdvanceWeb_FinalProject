const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

/* GET home page. */
// router
//   .route("/")
//   .get(
//     authController.checkToken,
//     authController.refreshToken,
//     authController.getHomePage
//   );
// router.get("/", (req, res) => {
//   res.render("index", { title: "Express", layout: "admin" });
// });
router.route("/pending").get(adminController.getPending);
router.route("/activated/:username").post(adminController.activated);
router.route("/cancel/:username").post(adminController.disabled);
router.route("/addInfo/:username").post(adminController.addInfo);

router.route("/activated").get(adminController.getActive);
router.route("/disabled").get(adminController.getDisabled);
router.route("/userDetail/:username").get(adminController.getUserDetail);

router.get("/locked", function (req, res) {
  res.render("locked", { layout: "admin" });
});
router.get("/disabled", function (req, res) {
  res.render("disabled", { layout: "admin" });
});
router.get("/transactionApproval", function (req, res) {
  res.render("transactionApproval", { layout: "admin" });
});

module.exports = router;
