const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    mobileno: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    otp: {
        type: String,
    },
    otp_expires: {
        type: Date,
       
    },
    isVerified: {
        type: Boolean,
    }
})

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login