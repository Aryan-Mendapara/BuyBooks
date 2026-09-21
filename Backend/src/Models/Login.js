import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    mobileno: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
});

const Login = mongoose.model("Login", LoginSchema);

export default Login;
