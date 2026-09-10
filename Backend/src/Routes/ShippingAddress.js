import express from "express";
import { addAddress, getAddress, deleteAddress } from "../Controller/ShippingAddress.js";
const ShippingAddress = express.Router();

ShippingAddress.post("/add", addAddress);
ShippingAddress.get("/get", getAddress);
ShippingAddress.delete("/delete/:id", deleteAddress);

export default ShippingAddress;