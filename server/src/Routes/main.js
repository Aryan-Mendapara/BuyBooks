const express = require("express");
const index = express.Router();
const login = require("./Login");
const details = require("./BillingDetails");
const books = require("./BestBooks");
const wishlist = require("./WishList");
const accountRouter = require("./account");

index.use("/login",login);  
index.use("/images", books);
index.use("/billing",details);
index.use("/wishlist", wishlist);
index.use("/account",accountRouter);

module.exports = index