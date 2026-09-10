import express from "express";
const index = express.Router();
import login from "./Login.js";
import details from "./BillingDetails.js";
import books from "./Images.js";
import wishlist from "./WishList.js";
import accountRouter from "./Account.js";
import ShippingAddress from "./ShippingAddress.js";

index.use("/login",login);  
index.use("/images", books);
index.use("/billing",details);
index.use("/wishlist", wishlist);
index.use("/account", accountRouter);
index.use("/shippingaddress", ShippingAddress);

export default index;