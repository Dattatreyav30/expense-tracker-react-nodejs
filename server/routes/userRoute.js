const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const forgotController = require("../controllers/forgotPassController");

router.post("/signup", userController.postUser);

router.post("/login", userController.login);

router.post("/forgot-password", forgotController.forgotPass);

router.post("/update-password", forgotController.updatePassword);

module.exports = router;
