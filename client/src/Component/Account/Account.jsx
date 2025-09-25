import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slice/authSlice";
import { LoginDelete } from "../ApiServer/LoginApi";
import { addaccount } from "../ApiServer/AccountApi";
import { ThemeContext } from "../ThemeContext/ThemeContext";

function Account() {
  const { darkMode } = useContext(ThemeContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) await LoginDelete(userId);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

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
        mobileno: Number(mobile),
        email,
        gender: gender.toLowerCase(),
      };

      await addaccount(accountData);
      setSuccess("Account submitted successfully!");
    } catch (err) {
      const message = err.response?.data?.message || "Account submission failed.";
      setError(message);
    }
  };

  return (
    <div className={`${darkMode ? "bg-black/90 text-white" : "bg-gray-100 text-black"} min-h-screen py-10 px-4`}>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} w-full lg:w-64 rounded-xl shadow-md p-6 flex-shrink-0`}>
          <h2 className="text-xl font-semibold mb-4">My Account</h2>
          <button 
            className={`w-full text-left px-4 py-2 mb-3 rounded-lg transition ${darkMode ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-500 hover:bg-orange-600"} text-white`}
          >
            Account
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
          >
            Logout
          </button>
        </div>

        {/* Account Form */}
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} flex-1 rounded-xl shadow-md p-8`}>
          <h1 className="text-2xl font-bold mb-6 border-b pb-3">Account Information</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  darkMode ? "bg-gray-800 text-white border-gray-700 focus:ring-orange-400" : "bg-white text-gray-800 border-black focus:ring-orange-400"
                }`}
              />
            </div>

            <div>
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  darkMode ? "bg-gray-800 text-white border-gray-700 focus:ring-orange-400" : "bg-white text-gray-800 border-black focus:ring-orange-400"
                }`}
              />
            </div>

            <div>
              <label className="block mb-2">Mobile Number</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{10}"
                maxLength={10}
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  darkMode ? "bg-gray-800 text-white border-gray-700 focus:ring-orange-400" : "bg-white text-gray-800 border-black focus:ring-orange-400"
                }`}
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  darkMode ? "bg-gray-800 text-white border-gray-700 focus:ring-orange-400" : "bg-white text-gray-800 border-black focus:ring-orange-400"
                }`}
              />
            </div>

            <div>
              <label className="block mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  darkMode ? "bg-gray-800 text-white border-gray-700 focus:ring-orange-400" : "bg-white text-gray-800 border-black focus:ring-orange-400"
                }`}
              >
                <option value="">--- Select Gender ---</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Messages */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
      </div>
    </div>
  );
}

export default Account;
