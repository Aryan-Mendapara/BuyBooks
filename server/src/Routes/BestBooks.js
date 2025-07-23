const express = require("express");
const books = express.Router();
const uploads = require("../Middleware/multerStorage");
const { createBooks, getBooks, deleteBooks } = require("../Controller/BooksController");
// const { AddBestBooks, getBestBooks, deleteBestBooks } = require("../Controller/BestSeller");

books.post('/import',uploads.single('image'),createBooks);
books.get('/get', getBooks);
books.delete('/delete/:id', deleteBooks);

module.exports = books