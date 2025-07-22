const express = require("express");
const index = express.Router();
const login = require("./Login");
// const booksRoutes = require("./booksRoutes");
const router = require("./NewArrival");
const best = require("./BestSeller");

index.use("/login",login);  
index.use("/file", best)
index.use("/new", router);


module.exports = index