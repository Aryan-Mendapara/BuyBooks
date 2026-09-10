import mongoose from "mongoose";

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
    otpExpires: {
        type: Date,
       
    },
    isVerified: {
        type: Boolean,
    }
})

const Login = mongoose.model("Login", LoginSchema);

export default Login;
