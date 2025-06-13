const express = require("express");
const index = express.Router();
const login = require("./Login");

index.use("/login",login);

module.exports = index