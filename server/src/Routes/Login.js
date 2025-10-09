const express = require("express");
const {  addLogin, deleteLogin, getLogin } = require("../Controller/Login.js");
const verifyOtp = require("../Controller/varifyOtp.js");
const router = express.Router();

router.post("/loginuser", addLogin);
router.post("/verify-otp", verifyOtp);
router.get("/getlogin", getLogin);
router.delete("/delete/:id", deleteLogin);

module.exports = router;
