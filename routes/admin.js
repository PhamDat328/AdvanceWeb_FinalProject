const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");



router.route("/").get(adminController.getAdminHomePage)

router.route("/profile").get(adminController.getProfile)

router
  .route("/pending")
  .get(adminController.getPending)
  .post(adminController.searchPendingUser);
router.route("/activated/:username").post(adminController.activated);
router.route("/cancel/:username").post(adminController.disabled);
router.route("/addInfo/:username").post(adminController.addInfo);

router.route("/activated").get(adminController.getActive);
router.route("/disabled").get(adminController.getDisabled);
router.route("/userDetail/:username").get(adminController.getUserDetail);

router
  .route("/transactionApproval/withdraw")
  .get(adminController.getPendingTransaction)
  .post(adminController.searchPendingTransaction);

router.route("/transactionApproval/withdraw/:transactionID").get(adminController.getPendingWithdrawDetail);

router
  .route("/transaction/withdraw/accepted")
  .post(adminController.acceptWithdrawTransaction);
module.exports = router;
