const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");


/* GET users listing. */
router.route("/recover").get(userController.getEnterOTPForm);

module.exports = router;