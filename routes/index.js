const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const User = require("../models/User");
const { route } = require("./users");

/* GET home page. */


router
  .route("/")
  .get(
    authController.checkToken,
    authController.refreshToken,
    authController.getHomePage
  );

router.route("/successRegister").get(authController.getSuccessRegister);

router
  .route("/login")
  .get(authController.getLoginPage)
  .post(authController.postLoginPage);

router.route("/logout").get(authController.logout);
router
  .route("/resetPassword")
  .get(authController.getResetPasswordPage)
  .post(authController.postResetPasswordPage);
router
  .route("/register")
  .get(authController.getRegisterPage)
  .post(authController.postRegisterPage);

// ----------------------------------------------------------------------------------------------
//check user is login or not
// router.use((req,res,next) => {
  
//   if(req.session.isLogin)
//   {
//     if(req.session.admin)
//     {
//       return res.redirect("/admin")
//     }
//     else
//     {
//       next()
//     }
//   }
//   else
//   {
//     req.session.destroy()
//     return res.redirect("/login")
//   }
  
// })

  router
  .route("/changePassword")
  .get(authController.getChangePasswordPage)
  .post(authController.postChangePasswordPage);
router
  .route("/deposit")
  .get(userController.getDepositForm)
  .post(userController.postDepositForm);
router
  .route("/withdraw")
  .get(userController.getWithdrawForm)
  .post(userController.postWithdrawForm);
router.route("/transfer").get(userController.getTransferForm).post(userController.postTransferForm);
router.route("/getUserNameByPhoneNumber").post(userController.getUserNameByPhoneNumber);
router.route("/verifyTransfer").post(userController.makeTransfer)

router.route("/buyphonecard").get(userController.getBuyPhoneCardForm).post(userController.postBuyPhoneCard);
router.route("/transaction").get(userController.getTransactionHistory);
router.route("/profile").get(userController.getProfile);

module.exports = router;
