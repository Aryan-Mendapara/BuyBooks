import express from "express";
import adminAuth from "../Middleware/adminAuth.js";
import uploads from "../Middleware/multerStorage.js";
const adminLoginRouter = express.Router();

import {
  adminLogin,
  getAdminBooks,
  getAdminCustomers,
  getAdminDashboard,
} from "../Controller/AdminController.js";
import { createBooks } from "../Controller/ImagesController.js";

adminLoginRouter.post("/login", adminLogin);
adminLoginRouter.use(adminAuth);
adminLoginRouter.get("/dashboard", getAdminDashboard);
adminLoginRouter.get("/books", getAdminBooks);
adminLoginRouter.get("/customers", getAdminCustomers);
adminLoginRouter.post("/books", uploads.single("image"), createBooks);

export default adminLoginRouter;