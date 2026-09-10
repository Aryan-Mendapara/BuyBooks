import express from "express";
const router = express.Router();
import uploads from "../Middleware/multerStorage.js";
import { createBooks, getBooks, deleteBooks } from "../Controller/ImagesController.js";

router.post("/import", uploads.single("image"), createBooks);
router.get("/get", getBooks);
router.delete("/delete/:id", deleteBooks);

export default router;
