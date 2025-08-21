import React, { useState } from 'react';
import { addAddress } from '../../ApiServer/ShippingAddress';
import { useNavigate } from 'react-router-dom';

function ShippingAddress() {
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

        console.log("Submitting address:", newAddress);

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


    return (
        <div className='mx-auto px-4 py-8 bg-gray-100'>
            <div className='max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md'>
                {/* title */}
                <div>
                    <h1 className='text-2xl font-bold mb-4 border-b pb-3'>Shipping Address</h1>
                </div>

                {/* error & success messages */}
                {error.api && <p className="text-red-500 mb-2">{error.api}</p>}
                {success && <p className="text-green-600 mb-2">{success}</p>}

                {/* Form */}
                <form
                    className='grid grid-cols-1 md:grid-cols-3 gap-6'
                    onSubmit={handleSubmit}
                >

                    {/* Sur Name */}
                    <div>
                        <label className="block text-gray-700 mb-2">Sur Name<span className='text-red-600 text-xl'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your Surname"
                            value={surName}
                            onChange={(e) => setSurName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {error.surName && <p className="text-red-500 text-sm">{error.surName}</p>}
                    </div>

                    {/* First Name */}
                    <div>
                        <label className="block text-gray-700 mb-2">First Name<span className='text-red-600 text-xl'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your Firstname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {error.firstName && <p className="text-red-500 text-sm">{error.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-gray-700 mb-2">Last Name<span className='text-red-600 text-xl'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your Lastname"
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {error.lastname && <p className="text-red-500 text-sm">{error.lastname}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 mb-2">Email<span className='text-red-600 text-xl'>*</span></label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block text-gray-700 mb-2">Mobile Number<span className='text-red-600 text-xl'>*</span></label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="Enter your mobile number"
                            value={mobileno}
                            onChange={(e) => setMobileno(e.target.value.replace(/\D/g, ""))}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {error.mobile && <p className="text-red-500 text-sm">{error.mobile}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-gray-700 mb-2">Address<span className='text-red-600 text-xl'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {error.address && <p className="text-red-500 text-sm">{error.address}</p>}
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-gray-700 mb-2">City<span className='text-red-600 text-xl'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {error.city && <p className="text-red-500 text-sm">{error.city}</p>}
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-gray-700 mb-2">State/Province<span className='text-red-600 text-xl'>*</span></label>
                        <select
                            name="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
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
                        <label className="block text-gray-700 mb-2">Country<span className='text-red-600 text-xl'>*</span></label>
                        <select
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
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
                        <label className="block text-gray-700 mb-2">ZipCode<span className='text-red-600 text-xl'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your ZipCode"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        />
                        {error.zipCode && <p className="text-red-500 text-sm">{error.zipCode}</p>}
                    </div>
                </form>

                {/* Submit button */}
                <div className='flex justify-center mt-6'>
                    <button
                        onClick={handleSubmit}
                        className='px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition'
                    >
                        Continue Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShippingAddress;
