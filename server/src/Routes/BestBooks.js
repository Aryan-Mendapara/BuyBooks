const express = require("express");
const router = express.Router();
const uploads = require("../Middleware/multerStorage");
const { AddBestBooks, getBestBooks, deleteBestBooks } = require("../Controller/BestSeller");
// const {createBooks, getBooks, deleteBooks} = require("../Controller/BooksController");

router.post('/import',uploads.single('image'),AddBestBooks);
router.get('/get', getBestBooks);
router.delete('/delete/:id', deleteBestBooks);

module.exports = router