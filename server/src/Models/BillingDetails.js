const mongooes = require('mongoose');

const booksSchema = new mongooes.Schema({
    image: { 
        type: String,
        required: true 
    },
    Product: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Availability: {
        type: String,
        required: true
    },
    Price	: {
        type: Number,
        required: true
    },
    Discount: {
        type: Number,
        required: true
    },
    OurPrice: {
        type: Number,
        required: true
    },
    Qty: {
        type: Number,
        required: true
    },
    Total: {
        type: Number,
        required: true
    }    
})

const BillingDetails = mongooes.model("BillingDetails", booksSchema);

module.exports = { BillingDetails }