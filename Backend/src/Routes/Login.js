import express from "express";
import { addLogin, deleteLogin, getLogin, registerUser } from "../Controller/Login.js";
import verifyOtp from "../Controller/varifyOtp.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/loginuser", addLogin);
router.post("/verify-otp", verifyOtp);
router.get("/getlogin", getLogin);
router.delete("/delete/:id", deleteLogin);

export default router;
