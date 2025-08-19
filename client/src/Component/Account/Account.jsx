import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slice/authSlice";
import { LoginDelete } from "../ApiServer/LoginApi";
import { addaccount } from "../ApiServer/AccountApi";

function Account() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ✅ Logout handler
    const handleLogout = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (userId) {
                await LoginDelete(userId);
            }
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // ✅ Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!/^\d{10}$/.test(mobile)) {
            setError("Enter a valid 10-digit mobile number");
            return;
        }

        try {
            const accountData = {
                firstName,
                lastName,
                mobileno: Number(mobile), // ensure number
                email,
                gender: gender.toLowerCase(), // ensure matches schema
            };

            const res = await addaccount(accountData);
            console.log("Account API success:", res);
            alert("Account submitted successfully!");
        } catch (error) {
            const message = error.response?.data?.message || "Account failed. Try again.";
            setError(message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto flex gap-8 px-6">
                {/* Sidebar */}
                <div className="w-64 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        My Account
                    </h2>
                    <button className="w-full text-left px-4 py-2 mb-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
                        Account
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Account Form */}
                <div className="flex-1 bg-white rounded-xl shadow-md p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                        Account Information
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* First Name */}
                        <div>
                            <label className="block text-gray-700 mb-2">First Name</label>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-gray-700 mb-2">Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                            />
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className="block text-gray-700 mb-2">Mobile Number</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="\d{10}"
                                maxLength={10}
                                placeholder="Enter your mobile number"
                                value={mobile}
                                onChange={(e) =>
                                    setMobile(e.target.value.replace(/\D/g, ""))
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                            />

                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-gray-700 mb-2">Gender</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                            >
                                <option value="">--- Select Gender ---</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-2 flex justify-center mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 cursor-pointer"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                    {/* Messages */}
                    {error && <p className='text-red-500 mt-2'>{error}</p>}
                    {success && <p className='text-green-500 mt-2'>{success}</p>}
                </div>
            </div>
        </div>
    );
}

export default Account;
