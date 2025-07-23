const express = require("express");
const index = express.Router();
const login = require("./Login");
const newarrival = require("./NewArrival");
// const best = require("./BestSeller");
const details = require("./BillingDetails");
const books = require("./BestBooks");

index.use("/login",login);  
index.use("/best", books);
index.use("/new", newarrival);
// index.use("/file", best)
index.use("/billing",details)

module.exports = index