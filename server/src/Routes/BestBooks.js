const express = require("express");
const router = express.Router();
const uploads = require("../Middleware/multerStorage");
const { createBooks, getBooks, deleteBooks, searchBooks } = require("../Controller/BooksController");

router.post('/import', uploads.single('image'), createBooks);
router.get('/get', getBooks);
router.get('/search', searchBooks);
router.delete('/delete/:id', deleteBooks);

module.exports = router