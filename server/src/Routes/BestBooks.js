const express = require("express");
const router = express.Router();
const uploads = require("../Middleware/multerStorage");
const { createBooks, getBooks, deleteBooks } = require("../Controller/BooksController");

router.post('/import', uploads.single('image'), createBooks);
router.get('/get', getBooks);
router.delete('/delete/:id', deleteBooks);

module.exports = router