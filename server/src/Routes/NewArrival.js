const express = require("express");
const router = express.Router();
const uploads = require("../Middleware/multerStorage");
const { AddNewBooks, getNewBooks, deleteNewBooks } = require("../Controller/NewArrival");

router.post('/import',uploads.single('image'),AddNewBooks);
router.get('/get', getNewBooks);
router.delete('/delete/:id', deleteNewBooks);

module.exports = router