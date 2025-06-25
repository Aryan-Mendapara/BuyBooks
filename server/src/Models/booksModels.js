const mongooes = require('mongoose');

const booksSchema = new mongooes.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

const Image = mongooes.model("Image", booksSchema);

module.exports = {Image}