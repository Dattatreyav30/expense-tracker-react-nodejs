const express = require("express");

const router = express();

const userDetailsController = require("../controllers/useeDetailsController");

const authrozation = require("../middleware/authrizattion");

router.post(
  "/user-details",
  authrozation.authrozation,
  userDetailsController.postUserDetails
);
router.get("/verify-email", userDetailsController.verifyClickedEmail);

router.get(
  "/check-user",
  authrozation.authrozation,
  userDetailsController.checkUser
);

module.exports = router;
