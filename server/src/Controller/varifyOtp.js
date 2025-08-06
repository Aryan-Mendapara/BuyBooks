// verifyOtpController.js
const jwt = require('jsonwebtoken');
const Login = require('../Models/Login');

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await Login.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Example logic for already verified
  if (user.isVerified) {
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1d" });

    return res.status(200).json({
      message: "Already verified",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  }

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.isVerified = true;
  await user.save();

  const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1d" });

  return res.status(200).json({
    message: "OTP verified",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    }
  });
};
module.exports = verifyOtp;