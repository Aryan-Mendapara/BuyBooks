import jwt from "jsonwebtoken";
import { Image } from "../Models/imagesModels.js";
import Login from "../Models/Login.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid admin email or password",
      });
    }

    const jwtKey = process.env.JWT_KEY || process.env.JWT_SECRET;
    if (!jwtKey) {
      return res.status(500).json({ message: "JWT key is not configured" });
    }

    const token = jwt.sign(
      {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
      jwtKey,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAdminDashboard = async (_req, res) => {
  try {
    const [books, customers] = await Promise.all([
      Image.countDocuments(),
      Login.countDocuments(),
    ]);

    return res.status(200).json({
      stats: { books, customers, orders: 0, revenue: 0 },
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    return res.status(500).json({ message: "Failed to load dashboard" });
  }
};

export const getAdminBooks = async (req, res) => {
  try {
    const search = req.query.search?.trim();
    const query = search
      ? {
          $or: [
            { title: new RegExp(search, "i") },
            { author: new RegExp(search, "i") },
          ],
        }
      : {};
    const books = await Image.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ books });
  } catch (error) {
    console.error("Admin Books Error:", error);
    return res.status(500).json({ message: "Failed to load books" });
  }
};

export const getAdminCustomers = async (_req, res) => {
  try {
    const customers = await Login.find()
      .select("email mobileno isVerified")
      .sort({ _id: -1 });
    return res.status(200).json({ customers });
  } catch (error) {
    console.error("Admin Customers Error:", error);
    return res.status(500).json({ message: "Failed to load customers" });
  }
};
