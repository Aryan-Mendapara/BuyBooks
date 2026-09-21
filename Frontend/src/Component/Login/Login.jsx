import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Slice/authSlice';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { FiUserCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import { LoginUser, RegisterUser } from '../ApiServer/LoginApi';

function Login() {
    const { darkMode } = useContext(ThemeContext);
    const [isRegistering, setIsRegistering] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleRegister = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!firstName.trim() || !lastName.trim()) {
            setError("First name and last name are required");
            return;
        }

        if (!/^\d{10}$/.test(mobileno)) {
            setError("Enter a valid 10-digit mobile number");
            return;
        }

        if (!validateEmail(email)) {
            setError("Enter a valid email address");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (!gender) {
            setError("Please select your gender");
            return;
        }

        try {
            const payload = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                mobileno: Number(mobileno),
                email: email.trim(),
                password,
                gender: gender.toLowerCase(),
            };

            const response = await RegisterUser(payload);
            localStorage.setItem("userProfile", JSON.stringify(response.user || payload));
            setSuccess(response.message || "Registration successful. Please login with your details.");
            toast.success(response.message || "Registration successful. Please login now.");
            setIsRegistering(false);
            setFirstName("");
            setLastName("");
            setGender("");
            setPassword("");
        } catch (err) {
            const message = err.response?.data?.message || "Registration failed. Try again.";
            setError(message);
            toast.error(message);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!/^\d{10}$/.test(mobileno)) {
            setError("Enter a valid 10-digit mobile number");
            return;
        }

        if (!validateEmail(email)) {
            setError("Enter a valid email address");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            const response = await LoginUser({
                body: {
                    mobileno: Number(mobileno),
                    email: email.trim(),
                    password,
                },
            });

            if (response.token) {
                localStorage.removeItem("adminToken");
                localStorage.setItem("token", response.token);
                localStorage.setItem("userId", response.user._id);
                localStorage.setItem("userProfile", JSON.stringify(response.user));
                dispatch(login());
                toast.success(response.message || "Login successful");
                setTimeout(() => navigate("/"), 500);
                return;
            }

            throw new Error("Login failed");
        } catch (err) {
            const message = err.response?.data?.message || "User not found. Please register first.";
            setError(message);
            toast.error(message);
        }
    };

    return (
        <div className={`flex justify-center py-10 ${darkMode ? 'bg-black/90' : 'bg-gray-50'}`}>
            <div className={`w-[32rem] rounded-lg p-10 shadow-lg ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className="flex mb-6 rounded-lg overflow-hidden border border-orange-500">
                    <button
                        type="button"
                        onClick={() => setIsRegistering(false)}
                        className={`flex-1 py-2 font-semibold transition ${!isRegistering ? 'bg-orange-500 text-white' : (darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700')}`}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsRegistering(true)}
                        className={`flex-1 py-2 font-semibold transition ${isRegistering ? 'bg-orange-500 text-white' : (darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700')}`}
                    >
                        Register
                    </button>
                </div>

                <h1 className='text-orange-500 text-xl font-semibold mb-4 text-center'>
                    {isRegistering ? 'CREATE YOUR ACCOUNT' : 'FILL IN THE DETAILS'}
                </h1>

                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="flex flex-col gap-4">
                    {isRegistering && (
                        <>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`border-2 rounded-lg p-2 outline-none ${darkMode ? "border-gray-600 text-white placeholder-gray-400" : "border-gray-400 text-black placeholder-gray-500"}`}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`border-2 rounded-lg p-2 outline-none ${darkMode ? "border-gray-600 text-white placeholder-gray-400" : "border-gray-400 text-black placeholder-gray-500"}`}
                            />
                        </>
                    )}

                    <div className={`flex rounded-lg overflow-hidden border-2 ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                        <span className={`px-3 flex items-center justify-center border-r-2 font-medium ${
                            darkMode ? "text-white border-gray-600" : "text-black border-gray-400 bg-white"
                        }`}>
                            +91
                        </span>
                        <input
                            type="text"
                            maxLength={10}
                            pattern="\d{10}"
                            placeholder="Mobile No. (e.g. 9999999999)"
                            value={mobileno}
                            onChange={(e) => setMobileno(e.target.value.replace(/\D/g, ""))}
                            className={`flex-1 p-2 outline-none ${
                                darkMode ? "text-white placeholder-gray-400" : "bg-white text-black placeholder-gray-500"
                            }`}
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border-2 rounded-lg p-2 outline-none ${darkMode ? "border-gray-600 text-white placeholder-gray-400" : "border-gray-400 text-black placeholder-gray-500"}`}
                    />

                    <input
                        type="password"
                        placeholder={isRegistering ? 'Create Password' : 'Enter Password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`border-2 rounded-lg p-2 outline-none ${darkMode ? "border-gray-600 text-white placeholder-gray-400" : "border-gray-400 bg-white text-black placeholder-gray-500"}`}
                    />

                    {isRegistering && (
                        <div className={`rounded-lg border-2 overflow-hidden ${darkMode ? 'border-gray-600 bg-black' : 'border-gray-400 bg-white'}`}>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className={`w-full p-2 outline-none appearance-none cursor-pointer ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} ${darkMode ? 'focus:text-white' : 'focus:text-black'}`}
                                style={{
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none',
                                    backgroundImage: 'none',
                                }}
                            >
                                <option value="" className={darkMode ? 'bg-black text-white' : 'bg-white text-black'}>Select Gender</option>
                                <option value="male" className={darkMode ? 'bg-black text-white' : 'bg-white text-black'}>Male</option>
                                <option value="female" className={darkMode ? 'bg-black text-white' : 'bg-white text-black'}>Female</option>
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`bg-orange-500 w-full p-2 rounded-lg hover:bg-orange-600 cursor-pointer ${darkMode ? "text-white" : "text-black"}`}
                    >
                        {isRegistering ? 'Register' : 'Login'}
                    </button>

                    {!isRegistering && (
                        <div className="flex justify-start">
                            <button
                                type="button"
                                onClick={() => navigate("/admin")}
                                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 hover:underline text-sm font-medium cursor-pointer"
                            >
                                <FiUserCheck className="text-base" />
                                Admin
                            </button>
                        </div>
                    )}
                </form>

                {error && <p className='text-red-500 mt-2'>{error}</p>}
                {success && <p className='text-green-500 mt-2'>{success}</p>}
                {!isRegistering && (
                    <p className="mt-4 text-sm text-center">
                        Don’t have an account?{' '}
                        <button type="button" onClick={() => setIsRegistering(true)} className="text-orange-500 font-semibold hover:underline cursor-pointer">
                            Register here
                        </button>
                    </p>
                )}
                {isRegistering && (
                    <p className="mt-4 text-sm text-center">
                        Already have an account?{' '}
                        <button type="button" onClick={() => setIsRegistering(false)} className="text-orange-500 font-semibold hover:underline cursor-pointer">
                            Login here
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;