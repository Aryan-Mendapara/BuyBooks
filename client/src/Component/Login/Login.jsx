import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import LoginUser from '../ApiServer/LoginApi';

function Login() {
    const [mobileno, setMobileno] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [generateOtp, setGenerateOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleGenerateOtp = () => {
        // Clear messages
        setError("");
        setSuccess("");

        // Mobile number validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
            !/^\d{10}$/.test(mobileno) ||
            !emailRegex.test(email) ||
            password.length < 6
        ) {
            setError("Please fill in all fields correctly");
            return;
        }

        if (otp !== generateOtp || !otp) {
            setError("Invalid or missing OTP");
            return;
        }

        // All valid — Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        setGenerateOtp(otpCode);
        setOtp(otpCode); // Clear user's input
        setSuccess(`OTP generated: ${otpCode}`);
        console.log("Generated OTP:", otpCode); // Optional for dev
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        // Validation again before submit
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
            const response = await LoginUser({
                body: { mobileno, email, password, otp },
            });

            setSuccess("Login successful!");
            console.log("Server response:", response);
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            const message = error.response?.data?.message || "Login failed. Try again.";
            setError(message);
        }
    };

    const handleLogin = async (body) => {
        try {
            const response = await LoginUser({
                mobileno, email, password
            });
            setSuccess("User Login Successfull!");
            console.log("Server response : ", response);
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            const message = error.response?.data?.message || "Login failed. Try again.";
            setError(message);
        }
    }

    return (
        <div className='flex justify-center bg-gray-50 pt-20'>
            <div className='relative bg-white w-[32rem] text-center rounded-lg p-10 shadow-lg'>
                <h1 className='text-orange-500 text-xl'>FILL IN THE DETAILS</h1>

                <form onSubmit={handleSubmit}>
                    {/* Mobile Number */}
                    <div className='flex items-center border-2 border-gray-400 rounded-lg mt-4'>
                        <span className="px-3 text-gray-700 border-r-2 border-gray-400">+91</span>
                        <input
                            type="text"
                            maxLength={10}
                            pattern="\d{10}"
                            placeholder="Mobile No. (e.g. 9999999999)"
                            value={mobileno}
                            onChange={(e) => setMobileno(e.target.value.replace(/\D/, ""))}
                            className="w-full p-2 rounded-r-lg outline-none"
                        />
                    </div>

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 border-gray-400 rounded-lg mt-4 w-full p-2 outline-none"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 border-gray-400 rounded-lg mt-4 w-full p-2 outline-none"
                    />

                    {/* Generate OTP */}
                    <button
                        type="button"
                        onClick={handleGenerateOtp}
                        className='bg-orange-500 w-full p-2 rounded-lg mt-4 text-white hover:bg-orange-600 transition'
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
                        className='w-full p-2 mt-4 rounded-lg border-2 border-gray-400'
                    />

                    {/* Submit/Login */}
                    <button
                        onClick={handleLogin}
                        className='bg-orange-500 w-full p-2 rounded-lg mt-4 text-white flex items-center justify-center hover:bg-orange-600 transition'
                    >
                        <FaUser className='mr-2' />
                        Login
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
