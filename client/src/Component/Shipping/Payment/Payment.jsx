import React, { useState } from 'react';
import Logo from '../../../assets/img/logo.png';
import { IoIosArrowBack } from "react-icons/io";
import { MdGTranslate, MdCreditCard } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import paywithamex from "../../../assets/img/paywithamex.png";
import phonepe from "../../../assets/img/phonepe.png";
import googlepay from "../../../assets/img/googlepay.png";
import bhimupi from "../../../assets/img/bhimupi.png";
import AMZPAY from "../../../assets/img/AMZPAY.png";
import BFL from "../../../assets/img/BFL.png";
import ICIB from "../../../assets/img/ICIB.png";
import BOIB from "../../../assets/img/BOIB.png";
import FEDB from "../../../assets/img/FEDB.png";
import LAZYPAY from "../../../assets/img/LAZYPAY.png";
import PAYPAL from "../../../assets/img/PAYPAL.png";
import LRD from "../../../assets/img/LRD.png";
import ZLS from "../../../assets/img/ZLS.png";
import { MdAccountBalanceWallet } from "react-icons/md";

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showAll, setShowAll] = useState(false);

    const preferredpayment = [
        {
            title: "Pay with Amex",
            icon: [paywithamex],
            description: "% Offer"
        },
        {
            title: "PhonePe/BHIM UPI",
            icon: [phonepe]
        },
    ];

    const otherpayment = [
        {
            title: "UPI",
            icon: [googlepay, phonepe, bhimupi],
            description: "% ₹1 - ₹100 Cashback"
        },
        {
            title: "Cards (Credit/Debit)",
            icon: [<MdCreditCard size={25} />],
            description: "% Offer"
        },
        {
            title: "Wallet",
            icon: [phonepe, AMZPAY, BFL],
            description: "% ₹1 - ₹150 Cashback"
        },
        {
            title: "Net Banking",
            icon: [ICIB, BOIB, FEDB]
        },
        {
            title: "LazyPay",
            icon: [LAZYPAY]
        },
        {
            title: "PayPal",
            icon: [PAYPAL]
        },
        {
            title: "Pay By Rewards",
            icon:[<MdAccountBalanceWallet size={25} />, LRD, ZLS]
        },
        {
            title: "Google Pay",
            icon: [googlepay]
        },
    ];

    const grandTotal = location.state?.grandTotal ?? 0;

    // Determine which payments to show based on showAll state
    const displayedPayments = showAll ? otherpayment : otherpayment.slice(0, 4);

    return (
        <div className="bg-gray-50 py-5 min-h-screen">
            <div className="flex justify-center gap-4 flex-wrap">

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

                    <h1 className="text-sm mt-2 text-gray-900">OFFERS</h1>

                    <div className="mt-5 border-t text-gray-500 border-gray-500 pt-2">
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
                        <MdGTranslate size={20} className="ml-auto text-gray-500" />
                    </div>

                    <h1 className="border-t mt-2 border-gray-300 text-gray-600 text-sm py-2">
                        PREFERRED PAYMENT OPTIONS
                    </h1>
                    <div className="mt-2 space-y-2">
                        {preferredpayment.map((pay, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between gap-3 border rounded-lg px-3 py-2 bg-white border-white hover:shadow-md cursor-pointer transition"
                            >
                                <div>
                                    <h1 className="font-medium text-gray-900">{pay.title}</h1>
                                    <span className='text-xs font-semibold text-green-800'>{pay.description}</span>
                                </div>
                                <img src={pay.icon} alt={pay.title} className="w-6 h-6 object-contain rounded-full" />
                            </div>
                        ))}
                    </div>

                    {/* Other Payment */}
                    <h1 className="mt-4 text-gray-600 text-sm">OTHER PAYMENT OPTIONS</h1>
                    <div className="mt-2 space-y-2">
                        {displayedPayments.map((pay, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border rounded-lg px-3 py-2 bg-white border-white hover:shadow-md cursor-pointer transition"
                            >
                                <div>
                                    <h1 className="font-medium text-gray-900">{pay.title}</h1>
                                    <span className='text-xs font-semibold text-green-800'>{pay.description}</span>
                                </div>
                                <div className="flex">
                                    {pay.icon && pay.icon.map((ic, i) =>
                                        typeof ic === "string" ? (
                                            <img key={i} src={ic} alt={pay.title} className="w-6 h-6 object-contain rounded-full" />
                                        ) : (
                                            <span key={i}>{ic}</span>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Show All / Show Less Button */}
                    {otherpayment.length > 4 && (
                        <button
                            className="mt-2 text-blue-600 text-sm font-medium hover:underline"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? "Show Less" : "Show All"}
                        </button>
                    )}
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <p className="w-[35rem] text-sm text-gray-500 text-center">
                    I consent to PayU Group, their Business Partners and their service providers processing my data to offer relevant product and services. Manage your preference here.
                </p>
            </div>
        </div>
    );
}

export default Payment;
