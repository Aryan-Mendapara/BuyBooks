import express from "express";
const details = express.Router();
import uploads from "../Middleware/multerStorage.js";
import { addBooks, getBooks, deleteBooks } from "../Controller/BillingDetails.js";

details.post('/import',uploads.single('image'),addBooks);
details.get('/get', getBooks);
details.delete('/delete/:id', deleteBooks);

export default details;