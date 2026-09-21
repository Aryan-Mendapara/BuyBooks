// src/Controller/Login.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Login from "../Models/Login.js";
import Register from "../Models/Register.js";
import UserLogin from "../Models/UserLogin.js";

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, mobileno, email, password, gender } = req.body;

    if (!firstName || !lastName || !email || !mobileno || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^\d{10}$/.test(String(mobileno))) {
      return res.status(400).json({ message: "Enter a valid 10-digit mobile number" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await Register.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Register({
      firstName,
      lastName,
      mobileno: Number(mobileno),
      email: email.toLowerCase(),
      password: hashedPassword,
      gender: gender.toLowerCase(),
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        mobileno: newUser.mobileno,
        email: newUser.email,
        gender: newUser.gender,
      },
    });
  } catch (error) {
    console.error("Register user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addLogin = async (req, res) => {
  try {
    const { email, mobileno, password } = req.body;

    if (!email || !mobileno || !password) {
      return res.status(400).json({ message: "Email, mobile number and password are required" });
    }

    if (!/^\d{10}$/.test(String(mobileno))) {
      return res.status(400).json({ message: "Enter a valid 10-digit mobile number" });
    }

    const user = await Register.findOne({
      email: email.toLowerCase(),
      mobileno: Number(mobileno),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await UserLogin.create({
        userId: user._id,
        email: email.toLowerCase(),
        mobileno: Number(mobileno),
        status: "failed",
      });
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY || process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    await UserLogin.create({
      userId: user._id,
      email: user.email,
      mobileno: user.mobileno,
      status: "success",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        mobileno: user.mobileno,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getLogin = async (req, res) => {
  try {
    const users = await Login.find();
    return res.status(200).json({ message: "Users fetched successfully", users });
  } catch (err) {
    console.error("Get login error:", err);
    return res.status(500).json({ message: "Failed to get users" });
  }
};

const deleteLogin = async (req, res) => {
  try {
    const login = await Login.findByIdAndDelete(req.params.id);
    if (!login) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "Login deleted successfully" });
  } catch (err) {
    console.error("Delete login error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addLogin, getLogin, deleteLogin, registerUser };
