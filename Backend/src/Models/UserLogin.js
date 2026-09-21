import mongoose from "mongoose";

const UserLoginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  mobileno: {
    type: Number,
    required: true,
  },
  loginAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["success", "failed"],
    default: "success",
  },
});

const UserLogin = mongoose.model("UserLogin", UserLoginSchema);

export default UserLogin;
