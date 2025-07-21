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
    // category: {
    //     type: String,
    //     enum: ['newarrival', 'bestseller'],
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const NewBooks = mongooes.model("NewArrival", booksSchema);

module.exports = { NewBooks }