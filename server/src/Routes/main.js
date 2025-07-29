const express = require("express");
const index = express.Router();
const login = require("./Login");
const details = require("./BillingDetails");
const books = require("./BestBooks");

index.use("/login",login);  
index.use("/images", books);
index.use("/billing",details)

module.exports = index