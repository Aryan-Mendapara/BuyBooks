const mongoose = require('mongoose');

const shippingAddressSchema = new mongoose.Schema({
    surName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ["Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh",
            "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli",
            "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
            "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
            "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
            "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
            "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
        required: true
    },
    country: {
        type: String,
        enum: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina",
            "Australia", "Austria", "Bangladesh", "Belgium", "Bhutan", "Brazil",
            "Canada", "China", "Denmark", "Egypt", "Finland", "France", "Germany",
            "Greece", "Hong Kong", "Iceland", "India", "Indonesia", "Iran", "Iraq",
            "Ireland", "Israel", "Italy", "Japan", "Kenya", "Kuwait", "Malaysia",
            "Maldives", "Mexico", "Nepal", "Netherlands", "New Zealand", "Nigeria",
            "Norway", "Pakistan", "Philippines", "Poland", "Portugal", "Qatar",
            "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea",
            "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey",
            "UAE", "UK", "USA", "Vietnam", "Zimbabwe"],
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    }
});

const ShippingAddress = mongoose.model("ShippingAddress", shippingAddressSchema);

module.exports = ShippingAddress;