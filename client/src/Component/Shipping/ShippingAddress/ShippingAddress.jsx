import React, { useContext, useState } from 'react';
import { addAddress } from '../../ApiServer/ShippingAddress';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext/ThemeContext';

function ShippingAddress() {
    const { darkMode } = useContext(ThemeContext);
    const [surName, setSurName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState({});
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const State = [
        "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
        "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman & Diu", "Delhi", "Goa",
        "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka",
        "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
        "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
        "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina",
        "Australia", "Austria", "Bangladesh", "Belgium", "Bhutan", "Brazil",
        "Canada", "China", "Denmark", "Egypt", "Finland", "France", "Germany",
        "Greece", "Hong Kong", "Iceland", "India", "Indonesia", "Iran", "Iraq",
        "Ireland", "Israel", "Italy", "Japan", "Kenya", "Kuwait", "Malaysia",
        "Maldives", "Mexico", "Nepal", "Netherlands", "New Zealand", "Nigeria",
        "Norway", "Pakistan", "Philippines", "Poland", "Portugal", "Qatar",
        "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea",
        "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey",
        "UAE", "UK", "USA", "Vietnam", "Zimbabwe"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newAddress = {
            surName,
            firstName,
            lastName,
            email,
            mobileno,
            address,
            city,
            state,
            country,
            zipcode
        };

        try {
            await addAddress(newAddress);
            alert("Address added successfully");
            setSuccess("Address added successfully");
            navigate('/order-summary');
        } catch (error) {
            console.error("Failed to submit address:", error);
            setError("Failed to submit address. Please try again.");
            alert("Failed to submit address. Please try again.");
        }
    };

    const inputClass = `w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'text-white bg-black placeholder-gray-400 border-gray-600' : 'text-black placeholder-gray-500 border-gray-400'
        }`;

    return (
        <div className={`mx-auto px-4 py-8 ${darkMode ? 'bg-black/90 text-white' : 'bg-gray-100 text-gray-700'}`}>
            <div className={`max-w-7xl mx-auto p-6 rounded-lg shadow-md ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {/* title */}
                <h1 className='text-2xl font-bold mb-4 border-b pb-3'>Shipping Address</h1>

                {/* error & success messages */}
                {error.api && <p className="text-red-500 mb-2">{error.api}</p>}
                {success && <p className="text-green-500 mb-2">{success}</p>}

                {/* Mandatory notice */}
                <div className="mb-4 text-sm">
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Fields marked with <span className="text-red-500">*</span> are mandatory.
                    </p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit}>
                    {/* Sur Name */}
                    <div>
                        <label className="block mb-2">Sur Name <span className='text-red-600'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your Surname"
                            value={surName}
                            onChange={(e) => setSurName(e.target.value)}
                            className={inputClass}
                        />
                        {error.surName && <p className="text-red-500 text-sm">{error.surName}</p>}
                    </div>

                    {/* First Name */}
                    <div>
                        <label className="block mb-2">First Name <span className='text-red-600'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your Firstname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={inputClass}
                        />
                        {error.firstName && <p className="text-red-500 text-sm">{error.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block mb-2">Last Name <span className='text-red-600'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your Lastname"
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                            className={inputClass}
                        />
                        {error.lastname && <p className="text-red-500 text-sm">{error.lastname}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2">Email <span className='text-red-600'>*</span></label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                        />
                        {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label className="block mb-2">Mobile Number <span className='text-red-600'>*</span></label>
                        <input
                            type="text"
                            maxLength={10}
                            placeholder="Enter your mobile number"
                            value={mobileno}
                            onChange={(e) => setMobileno(e.target.value.replace(/\D/g, ""))}
                            className={inputClass}
                        />
                        {error.mobile && <p className="text-red-500 text-sm">{error.mobile}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-2">Address <span className='text-red-600'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={inputClass}
                        />
                        {error.address && <p className="text-red-500 text-sm">{error.address}</p>}
                    </div>

                    {/* City */}
                    <div>
                        <label className="block mb-2">City <span className='text-red-600'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={inputClass}
                        />
                        {error.city && <p className="text-red-500 text-sm">{error.city}</p>}
                    </div>

                    {/* State */}
                    <div>
                        <label className="block mb-2">State/Province <span className='text-red-600'>*</span></label>
                        <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className={inputClass}
                        >
                            <option value="">--- Select State ---</option>
                            {State.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                        {error.state && <p className="text-red-500 text-sm">{error.state}</p>}
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block mb-2">Country <span className='text-red-600'>*</span></label>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className={inputClass}
                        >
                            <option value="">--- Select Country ---</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                        {error.country && <p className="text-red-500 text-sm">{error.country}</p>}
                    </div>

                    {/* ZipCode */}
                    <div>
                        <label className="block mb-2">ZipCode<span className='text-red-600 text-xl'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your ZipCode"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            className={inputClass}
                        />
                        {error.zipCode && <p className="text-red-500 text-sm">{error.zipCode}</p>}
                    </div>
                </form>

                <div className='flex justify-center mt-6'>
                    <button type="button" onClick={handleSubmit} className={`px-6 py-2 bg-orange-500 font-medium rounded hover:bg-orange-600 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>
                        Continue Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShippingAddress;
