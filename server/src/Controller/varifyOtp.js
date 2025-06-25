const Login = require("../Models/Login");

const VarifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    console.log(">>>>>>>", req.body);

    try {
        const user = await Login.findOne({ email });

        if (!user) return res.status(400).json({ message: "user not found" });
        if (user.isVerified) return res.status(200).json({ message: "Already verified" });

        if (user.otp !== otp || user.otp_expires < Date.now())
 {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otp = null;
        user.otp_expires = null;
        await user.save();

        return res.status(200).json({ message: "Email verified successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = VarifyOtp;