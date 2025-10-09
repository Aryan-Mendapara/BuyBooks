const express = require("express");
const { wishlistAdd, wishlistGet, wishlistDelete } = require("../Controller/WishList");
const wishlist = express.Router();

wishlist.post("/add", wishlistAdd);
wishlist.get("/get", wishlistGet);
wishlist.delete("/delete/:id", wishlistDelete);

module.exports = wishlist;