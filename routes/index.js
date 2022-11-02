const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController")
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


router.route("/").get(userController.getHomePage)

router.route("/login").get(authController.getLoginPage);

router.route("/register").get(authController.getRegisterPage).post(authController.postRegisterPage);

module.exports = router;