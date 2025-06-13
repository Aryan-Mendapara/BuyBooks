const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    mobileno: {
        type: Number,
        required: true
    }
})

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login