const bcrypt = require("bcrypt");
const Login = require("../Models/Login");
const sendEmail = require("../Models/sendMail");

const addLogin = async (req, res) => {
 try {
    const { email, mobileno } = req.body;

    if (!email || !mobileno) {
      return res.status(400).json({ message: "Email and Mobile are required" });
    }

    let user = await Login.findOne({ email });

    if (!user) {
      // Auto create user with random password
      const randomPassword = crypto.randomBytes(6).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = new login({
        email,
        mobileno,
        password: hashedPassword
      });
      await user.save();
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 min
    await user.save();

    // Send OTP to email
    await sendEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to email" });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteLogin = async (req, res) => {
  try {
    const login = await Login.findByIdAndDelete(req.params.id);
    if (!login)
      return res.status(404).json({ message: "User Not Found" });
    res.status(200).json({ message: "Login deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
}

module.exports = { addLogin, deleteLogin };