const express = require("express");

const router = express();

const userDetailsController = require("../controllers/useeDetailsController");

const authrozation = require("../middleware/authrizattion");

router.post(
  "/user-details",
  authrozation.authrozation,
  userDetailsController.postUserDetails
);

module.exports = router;
