const express = require("express");
const { addAddress } = require("../Controller/ShippingAddress");
const ShippingAddress = express.Router();

ShippingAddress.post("/add", addAddress);

module.exports = ShippingAddress;