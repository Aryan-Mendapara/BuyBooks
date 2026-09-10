import express from "express";
import { wishlistAdd, wishlistGet, wishlistDelete } from "../Controller/WishList.js";
const wishlist = express.Router();

wishlist.post("/add", wishlistAdd);
wishlist.get("/get", wishlistGet);
wishlist.delete("/delete/:id", wishlistDelete);

export default wishlist;