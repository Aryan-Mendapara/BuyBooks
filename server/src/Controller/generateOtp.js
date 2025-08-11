// const Login = require("../Models/Login");
// const sendEmail = require("../Models/sendMail");

// const generateOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await Login.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

//     user.otp = otp;
//     user.otp_expires = otpExpiry;

//     await user.save(); // ✅ Save the updated document

//     await sendEmail(email, 'OTP Verification', `Your OTP is: ${otp}`);

//     res.status(200).json({ message: "OTP sent successfully" });

//   } catch (error) {
//     console.error("Generate OTP Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = { generateOtp };


const Login = require("../Models/Login");
const sendEmail = require("../Models/sendMail");

const generateOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await Login.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otp_expires = otpExpiry;
    await user.save();

    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Generate OTP Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { generateOtp };
