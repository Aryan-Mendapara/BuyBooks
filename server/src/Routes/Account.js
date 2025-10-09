const express = require("express");
const { addAccount, deleteAccount } = require("../Controller/Account");
const accountRouter = express.Router();

accountRouter.post("/add",addAccount);
accountRouter.delete("/delete/:id", deleteAccount);

module.exports = accountRouter;