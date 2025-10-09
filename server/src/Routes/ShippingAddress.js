const express = require("express");
const { addAddress, getAddress, deleteAddress } = require("../Controller/ShippingAddress");
const ShippingAddress = express.Router();

ShippingAddress.post("/add", addAddress);
ShippingAddress.get("/get", getAddress);
ShippingAddress.delete("/delete/:id", deleteAddress);

module.exports = ShippingAddress;