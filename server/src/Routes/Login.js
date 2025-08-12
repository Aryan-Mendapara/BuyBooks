const express = require("express");
const {  addLogin, deleteLogin } = require("../Controller/Login.js");
const verifyOtp = require("../Controller/varifyOtp.js");
const router = express.Router();

router.post("/loginuser", addLogin);
router.post("/verify-otp", verifyOtp);
router.delete("/delete/:id", deleteLogin);

module.exports = router;
