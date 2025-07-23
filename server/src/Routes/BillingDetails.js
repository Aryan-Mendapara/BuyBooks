const express = require("express");
const details = express.Router();
const uploads = require("../Middleware/multerStorage");
const { addBooks, getBooks, deleteBooks } = require("../Controller/BillingDetails");

details.post('/import',uploads.single('image'),addBooks);
details.get('/get', getBooks);
details.delete('/delete/:id', deleteBooks);

module.exports = details