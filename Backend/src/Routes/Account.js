import express from "express";
import { addAccount, deleteAccount } from "../Controller/Account.js";
const accountRouter = express.Router();

accountRouter.post("/add",addAccount);
accountRouter.delete("/delete/:id", deleteAccount);

export default accountRouter;