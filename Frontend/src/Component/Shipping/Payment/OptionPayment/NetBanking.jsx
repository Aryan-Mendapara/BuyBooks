import React, { useState } from 'react'
import Logo from '../../../../assets/img/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

function NetBanking() {
    const [search, setSearch] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const allBnaks = [
        { title: "Airtel Payments Bank", icon: "/img/banks/AIRTEL.png" },
        { title: "ICICI Bank", icon: "/img/banks/ICIB.png" },
        { title: "HDFC Bank", icon: "/img/banks/HDFC.png" },
        { title: "Axis Bank", icon: "/img/banks/axis.png" },
        { title: "State Bank of India", icon: "/img/banks/SBI.png" },
        { title: "Kotak Mahindra Bank", icon: "/img/banks/KOTAK.png" },
        { title: "Punjab National Bank", icon: "/img/banks/PUNJAB.jpg" },
        { title: "Bank of Baroda", icon: "/img/banks/BankOfBaroda.png" },
        { title: "IDFC First Bank", icon: "/img/banks/IDFCNB.png" },
        { title: "UCO Bank", icon: "/img/banks/UCo.png" },
        { title: "Union Bank of India", icon: "/img/banks/Union.png" },
        { title: "Yes Bank", icon: "/img/banks/YES.png" },
        { title: "RBL Bank", icon: "/img/banks/RBL.png" },
        { title: "City Union Bank", icon: "/img/banks/CITY-UNION.png" },
    ];

    const grandTotal = location.state?.grandTotal ?? 0;

    return (
        <div className="bg-gray-50 py-5 min-h-screen">
            <div className="flex justify-center flex-wrap">
                {/* Payment Summary Card */}
                <div className="bg-white px-6 py-6 rounded-lg shadow-md w-[400px]">
                    <div className="flex justify-center gap-5">
                        <img src={Logo} alt="Logo" className="w-24" />
                        <h1 className="font-bold mt-3 text-lg text-gray-700">Buybooksindia</h1>
                    </div>

                    <div className="mt-5 flex justify-between items-center pt-4">
                        <h1 className="text-gray-900 text-lg font-medium">Payable Now</h1>
                        <h1 className="text-xl font-semibold text-green-700">₹ {grandTotal}</h1>
                    </div>

                    <div className="mt-100 border-t text-gray-500 border-gray-500 pt-2">
                        <h1>Secure Checkout</h1>
                        <h1 className="text-sm mt-1">Transaction Id: 608468997436043</h1>
                    </div>
                </div>

                {/* Payment Options Card */}
                <div className="bg-gray-100 px-4 py-4 w-[400px] rounded-lg shadow-md">
                    <div className="flex gap-5 items-center mb-4">
                        <h1
                            className="font-semibold flex items-center cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            <IoIosArrowBack className="mr-1" size={25} />
                            Back
                        </h1>
                    </div>

                    {/* Search Bar */}
                    <div className='flex items-center border border-gray-300 max-w-xl w-full rounded-lg overflow-hidden'>
                        <input
                            type="text"
                            placeholder='Search for your bank...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full max-w-[320px] min-w-[50px] h-8 text-sm outline-none px-5 placeholder-gray-500'
                        />
                        <button className="h-8 px-5 bg-gray-800 text-white text-lg font-semibold hover:bg-gray-500 transition cursor-pointer">
                            <FaSearch />
                        </button>
                    </div>
                    <h1 className='border-t mt-2 border-gray-300 text-sm py-2 text-gray-500'>All Bank</h1>

                    {/* Scrollable bank list */}
                    <div className='mt-2 space-y-2 max-h-110 overflow-y-auto pr-1'>
                        {allBnaks.map((pay, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between gap-3 border rounded-lg px-3 py-2 bg-white border-white hover:shadow-md cursor-pointer transition"
                                onClick={() => navigate(pay.path, { state: { grandTotal } })}
                            >
                                <div>
                                    <h1 className="font-medium text-gray-900">{pay.title}</h1>
                                    <span className='text-xs font-semibold text-green-800'>{pay.description}</span>
                                </div>
                                <img src={pay.icon} alt={pay.title} className="w-6 h-6 object-contain rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NetBanking
