const bcrypt = require("bcrypt");
const Login = require("../Models/Login");
const sendEmail = require("../Models/sendMail");

// -----------------------------
// Login controller
// -----------------------------
// const addLogin = async (req, res) => {
//     try {
//         const { email, mobileno, password } = req.body;
//         console.log(">>> Login Request:", req.body);

//         if (!/^\d{10}$/.test(mobileno)) {
//             return res.status(400).json({ message: "Please enter valid mobile number" });
//         }

//         const existLogin = await Login.findOne({ email });
//         if (!existLogin) {
//             return res.status(400).json({ message: "User does not exist" });
//         }

//         const isPasswordValid = await bcrypt.compare(password, existLogin.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         // Generate OTP
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

//         // Send Email
//         await sendEmail(email, 'Login OTP Verification', `Your OTP is: ${otp}`);

//         // Update OTP in DB
//         await Login.updateOne({ email }, { $set: { otp, otp_expires: otpExpiry } });

//         res.status(200).json({ message: "Login successful. OTP sent to your email." });

//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

const addLogin = async (req, res) => {
  try {
    const { email, mobileno, password } = req.body;
    console.log(">>> Login Request:", req.body);

    if (!/^\d{10}$/.test(mobileno)) {
      return res.status(400).json({ message: "Please enter valid mobile number" });
    }

    const existLogin = await Login.findOne({ email });
    if (!existLogin) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, existLogin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const user = new Login({
      email,
      mobileno,
      otp,
      otp_expires: otpExpiry,
      isVerified: false      
    })

    await user.save();

    // Send Email
    try {
      await sendEmail(email, 'Login OTP Verification', `Your OTP is: ${otp}`);
    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError);
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    // Update OTP in DB
    await Login.updateOne({ email }, { $set: { otp, otp_expires: otpExpiry } });

    res.status(200).json({ message: "Login successful. OTP sent to your email." });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// -----------------------------
// Register controller
// -----------------------------
const addRegister = async (req, res) => {
    try {
        const { email, mobileno, password } = req.body;
        console.log(">>> Register Request:", req.body);

        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!/^\d{10}$/.test(mobileno)) {
            return res.status(400).json({ message: "Please enter valid mobile number" });
        }

        const existRegister = await Login.findOne({ email });
        if (existRegister) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // Generate OTP for registration
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        const user = new Login({
            email,
            mobileno,
            password: hashPassword,
            otp,
            otp_expires: otpExpiry,
            isVerified: false
        });

        await user.save();

        // Send OTP to email
        await sendEmail(email, 'Verify your email', `Your OTP is: ${otp}`);

        res.status(201).json({ message: "User registered successfully. OTP sent to email." });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addLogin, addRegister };


// const getLogin = async (req, res) => {
//     try {
//         const login = await Login.find();
//         res.status(200).json({ message: "Login retrieved successfully", login })
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//         console.log(error);
//     }
// }

// const updateLogin = async (req, res) => {
//     try {
//         const login = await Login.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!login)
//             return res.status(404).json({ message: "User Not Found" });
//         res.status(200).json({ message: "Login updated successfully", login });
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//         console.log(error);
//     }
// }

// const deleteLogin = async (req, res) => {
//     try {
//         const login = await Login.findByIdAndDelete(req.params.id);
//         if (!login)
//             return res.status(404).json({ message: "User Not Found" });
//         res.status(200).json({ message: "Login deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//         console.log(error);
//     }
// }

// module.exports = { addLogin };