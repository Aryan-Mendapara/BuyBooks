const mongooes = require('mongoose');

const booksSchema = new mongooes.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    Publisher: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
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