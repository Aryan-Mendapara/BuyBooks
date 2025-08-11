// const express = require("express");
// const {addLogin, addRegister, deleteLogin } = require("../Controller/Login");
// const VarifyOtp = require("../Controller/varifyOtp");
// const { generateOtp } = require("../Controller/generateOtp");
// const login = express.Router();

// login.post("/post", addLogin);
// // login.get("/get",getLogin);
// login.delete("/delete/:id",deleteLogin);
// login.post("/verify-otp", VarifyOtp);
// // login.post("/register", addRegister); 
// login.post("/generate-otp",generateOtp);


// module.exports = login;

const express = require("express");
const { addLogin, deleteLogin } = require("../Controller/Login");
const verifyOtp = require("../Controller/varifyOtp");
const { generateOtp } = require("../Controller/generateOtp");

const login = express.Router();

login.post("/post", addLogin);           // POST /books/login/post  -> verify creds & send OTP
login.post("/generate-otp", generateOtp);
login.post("/verify-otp", verifyOtp);   // POST /books/login/verify-otp -> verify OTP & return token
login.delete("/delete/:id", deleteLogin);

module.exports = login;
