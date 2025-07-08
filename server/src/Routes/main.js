const express = require("express");
const index = express.Router();
const login = require("./Login");
const booksRoutes = require("./booksRoutes");

index.use("/login",login);  
index.use("/file", booksRoutes)

module.exports = index