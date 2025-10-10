import React, { useContext, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { LoginUser, verifyOtp } from '../ApiServer/LoginApi';
import { login } from '../Redux/Slice/authSlice';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../ThemeContext/ThemeContext';

function Login() {
    const { darkMode } = useContext(ThemeContext);
    const [mobileno, setMobileno] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleVerifyOtp = async () => {
        try {
            const response = await verifyOtp({ email, otp });
            setSuccess("Login successfully");
            if (response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("userId", response.user._id);
                dispatch(login());
                setTimeout(() => navigate("/"), 1000);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to verify OTP");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!/^\d{10}$/.test(mobileno)) {
            setError("Enter a valid 10-digit mobile number");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Enter a valid email address");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            const response = await LoginUser({ body: { mobileno, email, password } });
            console.log("otp generated", response);
            
            setSuccess("OTP generated successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Try again.");
        }
    };

    return (
        <div className={`flex justify-center py-10 ${darkMode ? 'bg-black/90' : 'bg-gray-50'}`}>
            <div className={`w-[32rem] rounded-lg p-10 shadow-lg ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <h1 className='text-orange-500 text-xl font-semibold mb-4 text-center'>FILL IN THE DETAILS</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Mobile Number */}
                    <div className={`flex rounded-lg overflow-hidden border-2 ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                        <span className={`px-3 flex items-center justify-center border-r-2 font-medium ${
                            darkMode
                                ? "text-white border-gray-600"
                                : "text-black border-gray-400 bg-white"
                        }`}>
                            +91
                        </span>
                        <input
                            type="text"
                            maxLength={10}
                            pattern="\d{10}"
                            placeholder="Mobile No. (e.g. 9999999999)"
                            value={mobileno}
                            onChange={(e) => setMobileno(e.target.value.replace(/\D/, ""))}
                            className={`flex-1 p-2 outline-none ${
                                darkMode
                                    ? "text-white placeholder-gray-400"
                                    : "bg-white text-black placeholder-gray-500"
                            }`}
                        />
                    </div>

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border-2 rounded-lg p-2 outline-none ${darkMode ? "border-gray-600 text-white placeholder-gray-400" : "border-gray-400 text-black placeholder-gray-500"}`}
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`border-2 rounded-lg p-2 outline-none ${darkMode ? "border-gray-600 text-white placeholder-gray-400" : "border-gray-400 bg-white text-black placeholder-gray-500"}`}
                    />

                    {/* Generate OTP */}
                    <button
                        type="submit"
                        className={`bg-orange-500 w-full p-2 rounded-lg hover:bg-orange-600 cursor-pointer ${darkMode ? "text-white" : "text-black"}`}
                    >
                        Generate OTP
                    </button>

                    {/* OTP Input */}
                    <input
                        type="text"
                        placeholder='Enter OTP'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                        maxLength={6}
                        className={`w-full p-2 rounded-lg border-2 outline-none ${darkMode ? "border-gray-600 text-white placeholder-gray-400" : "border-gray-400 bg-white text-black placeholder-gray-500"}`}
                    />

                    {/* Verify OTP */}
                    <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className={`bg-orange-500 w-full p-2 rounded-lg flex items-center justify-center hover:bg-orange-600 cursor-pointer ${darkMode ? "text-white" : "text-black"}`}
                    >
                        <FaUser className='mr-2' /> Login
                    </button>
                </form>

                {/* Messages */}
                {error && <p className='text-red-500 mt-2'>{error}</p>}
                {success && <p className='text-green-500 mt-2'>{success}</p>}
            </div>
        </div>
    );
}

export default Login;
