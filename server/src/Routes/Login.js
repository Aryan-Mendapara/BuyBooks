const express = require("express");
const {addLogin, addRegister } = require("../Controller/Login");
const VarifyOtp = require("../Controller/varifyOtp");
const { generateOtp } = require("../Controller/generateOtp");
const login = express.Router();

login.post("/post", addLogin);
// login.get("/get",getLogin);
// login.patch("/update/:id",updateLogin);
// login.delete("/delete/:id",deleteLogin);
login.post("/verify-otp", VarifyOtp);
login.post("/register", addRegister); 
login.post("/generate-otp",generateOtp);


module.exports = login;
