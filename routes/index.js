const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const User = require("../models/User");

/* GET home page. */

User.find((err, users) => {
  if (users.length) return;

  new User({
    fullName: "dat_pham",
    password: "abc123",
    address: "VietNam",
    email: "dat09@gmail.com",
  }).save();
});

router
  .route("/")
  .get(
    authController.checkToken,
    authController.refreshToken,
    authController.getHomePage
  );
router.get("/pending", function (req, res, next) {
  res.render("pending", { title: "Express", layout: "main" });
});

router.route("/successRegister").get(authController.getSuccessRegister);

router
  .route("/login")
  .get(authController.getLoginPage)
  .post(authController.postLoginPage);

router.route("/logout").get(authController.logout);
router
  .route("/changePassword")
  .get(authController.getChangePasswordPage)
  .post(authController.postChangePasswordPage);
router
  .route("/register")
  .get(authController.getRegisterPage)
  .post(authController.postRegisterPage);

module.exports = router;
