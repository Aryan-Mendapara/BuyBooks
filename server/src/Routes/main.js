const express = require("express");
const index = express.Router();
const login = require("./Login");
const booksRoutes = require("./booksRoutes");
const router = require("./NewArrival");

index.use("/login",login);  
index.use("/file", booksRoutes)
index.use("/new", router);


module.exports = index