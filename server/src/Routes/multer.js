const express = require("express");
const router = express.Router();
const uploads = require("../Middleware/multerStorage");
const createBooks = require("../Controller/BooksController");

router.post('/import',uploads.single('image'),createBooks);

module.exports = router