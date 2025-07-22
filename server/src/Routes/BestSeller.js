const express = require("express");
const best = express.Router();
const uploads = require("../Middleware/multerStorage");
const { createBooks, getBooks, deleteBooks } = require("../Controller/BestSeller");

best.post('/import',uploads.single('image'),createBooks);
best.get('/get', getBooks);
best.delete('/delete/:id', deleteBooks);

module.exports = best