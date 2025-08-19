// // verifyOtpController.js
// const jwt = require('jsonwebtoken');
// const Login = require('../Models/Login');

// const verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   const user = await Login.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   // Example logic for already verified
//   if (user.isVerified) {
//     const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1d" });

//     return res.status(200).json({
//       message: "Already verified",
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   }

//   if (user.otp !== otp) {
//     return res.status(400).json({ message: "Invalid OTP" });
//   }

//   user.isVerified = true;
//   await user.save();

//   const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1d" });

//   return res.status(200).json({
//     message: "OTP verified",
//     token,
//     user: {
//       _id: user._id,
//       name: user.name,
//       email: user.email
//     }
//   });
// };
// module.exports = verifyOtp;

const jwt = require('jsonwebtoken');
const Login = require('../Models/Login');

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) 
      return res.status(400).json({ message: "Email and OTP required" });

    const user = await Login.findOne({ email });
    if (!user) 
      return res.status(404).json({ message: "User not found" });

    // check expiry field name (we used otp_expires in some places)
    const expiry = user.otpExpires || user.otp_Expires;
    const storedOtp = user.otp;

    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (expiry && new Date(expiry) < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // mark verified and clear otp fields
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY || process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    return res.status(200).json({
      message: "OTP verified",
      token,
      user: {
        _id: user._id,
        email: user.email,
        mobileno: user.mobileno,
      }
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

  // try {
  //   const { email, otp } = req.body;

  //   const user = await login.findOne({ email });

  //   if (!user) return res.status(404).json({ message: "User not found" });

  //   if (user.otp !== otp || Date.now() > user.otpExpires) {
  //     return res.status(400).json({ message: "Invalid or expired OTP" });
  //   }

  //   // OTP verified → login success
  //   user.otp = null;
  //   user.otpExpires = null;
  //   await user.save();

  //   return res.status(200).json({ message: "Login successful" });

  // } catch (err) {
  //   console.error("Verify OTP error:", err);
  //   return res.status(500).json({ message: "Server error" });
  // }
};

module.exports = verifyOtp;
