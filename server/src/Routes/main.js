const express = require("express");
const index = express.Router();
const login = require("./Login");
const multer = require("./multer");

index.use("/login",login);  
index.use("/file", multer)

module.exports = index