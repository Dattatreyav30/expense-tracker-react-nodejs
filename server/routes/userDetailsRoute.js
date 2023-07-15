const express = require("express");

const router = express();

const userDetailsController = require("../controllers/useeDetailsController");

const authrozation = require("../middleware/authrizattion");

router.post(
  "/user-details",
  authrozation.authrozation,
  userDetailsController.postUserDetails
);

// router.get(
//   "/email",
//   authrozation.authrozation,
//   userDetailsController.verifyEmail
// );

router.get(
  "/verify-email",
  userDetailsController.verifyClickedEmail 
);

module.exports = router;
