import React from 'react'
import { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import LoginUser from '../ApiServer/LoginApi';

function Login() {
    const [mobileno, setMobileno] = useState("");
    const [otp, setOtp] = useState("");
    const [generateOtp, setGenerateOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSbmit = (event) => {
        event.preventDefault();
        setError();
        setSuccess();

        if (!/^\d{10}$/.test(mobileno)) {
            setError("Enter valid mobile number");
            return;
        } else {
            setSuccess("Valid mobile number ✔");
        }        
    }

    const handleGenerateOtp = () => {       
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        setGenerateOtp(otpCode);
        setOtp(otpCode); // Set OTP input field value
        setSuccess(`OTP generated: ${otpCode}`);
        setError("");        
    }

    const navigate = useNavigate();

    const handleLogin = async () => {        
        try {
            const response = await LoginUser({
                body: { mobileno },
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
        <div className='flex justify-center bg-gray-50 pt-20 '>
            <div className='relative bg-white w-[32rem] h-[21rem] text-center rounded-lg p-10'>
                <h1 className='text-orange-500 text-xl'>FILL IN THE DETAILS</h1>
                <form onSubmit={handleSbmit}>
                    <div className="flex items-center border-2 border-gray-400 rounded-lg mt-4">
                        <span className="px-3 text-gray-700 border-r-2 border-gray-400">+91</span>
                        <input
                            type="number"
                            maxLength={10}
                            placeholder="Mobile No. (e.g. 9999999999)"
                            value={mobileno}
                            onChange={(e) => setMobileno(e.target.value)}
                            className="w-full p-2 rounded-r-lg outline-none"
                        />
                    </div>

                    <button
                        onClick={handleGenerateOtp}
                        className='bg-orange-500 p-2 rounded-lg mt-4 text-white'
                    >
                        Genrate OTP
                    </button>
                    <input
                        type="number"
                        placeholder='Enter OTP'
                        value={otp}
                        readOnly // Prevent editing
                        className='w-full p-2 mt-4 rounded-lg border-2 border-gray-400 cursor-not-allowed'
                    />

                    <button
                        onClick={handleLogin}
                        className='bg-orange-500 p-2 rounded-lg mt-4 text-white'
                    >
                        <span className='px-3 flex items-center mx-1'><FaUser />
                            <span className='ml-2'>
                                Login
                            </span>
                        </span>
                    </button>
                </form>

                {error && <p className='text-red-500'>{error}</p>}
                {success && <p className='text-green-500'>{success}</p>}
            </div>
        </div>
    )
}

export default Login