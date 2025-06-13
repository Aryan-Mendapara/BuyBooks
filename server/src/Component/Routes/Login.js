const express = require("express");
const {addLogin, getLogin, updateLogin, deleteLogin } = require("../Controller/Login");
const login = express.Router();

login.post("/post", addLogin);
login.get("/get",getLogin);
login.patch("/update/:id",updateLogin);
login.delete("/delete/:id",deleteLogin);

module.exports = login;
