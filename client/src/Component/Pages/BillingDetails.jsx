import React from 'react';
import { useNavigate } from 'react-router-dom';

const BillingDetails = () => {
    const order = [
        { title: "Product" },
        { title: "Description" },
        { title: "Avail." },
        { title: "List Price" },
        { title: "Discount(%)" },
        { title: "Our Price" },
        { title: "Qty" },
        { title: "Total" },
    ]

    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 flex flex-col items-center py-10">
            {/* Table Header */}
            <div className="w-[90%] max-w-6xl border border-gray-300">
                <div className="grid grid-cols-8 bg-orange-500 text-white font-semibold text-sm text-center py-3">
                    {order.map((item, index) => (
                        <div key={index} className="px-2">
                            {item.title}
                        </div>
                    ))}
                </div>

                {/* Empty Cart Message */}
                <div className="text-center py-10 text-gray-600 text-lg">
                    Your shopping cart is empty.
                </div>
            </div>

            {/* Continue Shopping Button */}
            <button
                className="mt-6 px-6 py-2 bg-white border border-gray-400 hover:bg-gray-100 transition rounded text-sm font-medium cursor-pointer"
                onClick={() => navigate('/')}
            >
                Continue shopping
            </button>
        </div>
    );
}

export default BillingDetails;
