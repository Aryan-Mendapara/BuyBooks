import React from 'react'
import { useState } from 'react';
import { BillingApiGet } from '../../ApiServer/BillingDetailsApi';
import { useEffect } from 'react';
import pay_icons from '../../../assets/img/pay_icons.png';

function OrderSummary() {
    const order = [
        "Product",
        "Description",
        "Avail.",
        "List Price",
        "Discount(%)",
        "Our Price",
        "Qty",
        "Total"
    ];

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchBillingItems = async () => {
            try {
                const data = await BillingApiGet();
                console.log("✅ Billing data:", data);

                // Check if data.books or data.billing or another key holds the array
                const items = Array.isArray(data)
                    ? data
                    : data.billing || data.books || [];

                setCartItems(items.map(item => ({ ...item, quantity: item.quantity || 1 })));
            } catch (err) {
                console.error("❌ Error fetching billing items:", err);
            }
        };

        fetchBillingItems();
    }, []);



    const handleQuantityChange = (id, action) => {
        const updated = cartItems.map(item => {
            if (item._id === id) {
                const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: newQty > 1 ? newQty : 1 };
            }
            return item;
        });
        setCartItems(updated);
    };

    return (
        <div className='mt-3 mb-3'>
            <div>
                <h1 className='flex justify-center mb-1 text-2xl'>Shopping Cart Order Summary</h1>
                <div className='w-82 h-0.5 bg-orange-500 mx-auto mt-2'></div>
            </div>

            {/* Address */}
            <div className='grid grid-cols-2 mt-4'>
                <div className='mx-25'>
                    <h1 className='text-xl'>Shipping Address</h1>
                </div>
                <div className='mx-5'>
                    <h1 className='text-xl'>Billing Address</h1>
                </div>
            </div>

            {/* BillingDetails */}
            <div className="flex flex-col items-center py-10 mt-5">
                <table className="w-[90%] max-w-6xl">
                    <thead>
                        <tr className="bg-orange-500 text-white font-semibold text-sm text-center">
                            {order.map((title, index) => (
                                <th
                                    key={index}
                                    className="px-2 py-3 border border-gray-300"
                                >
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className="text-center text-sm border-t border-gray-300 items-center"
                                >
                                    <td className="px-2 py-2 border border-gray-300">
                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
                                            alt={item.Product}
                                            className="h-16 w-16 mx-auto object-contain"
                                        />
                                    </td>
                                    <td className="px-2 border border-gray-300">{item.Description}</td>
                                    <td className="px-2 border border-gray-300 text-green-600 font-bold">{item.Availability}</td>
                                    <td className="px-2 border border-gray-300">₹{item.Price}</td>
                                    <td className="px-2 border border-gray-300">{item.Discount}%</td>
                                    <td className="px-2 border border-gray-300">₹{item.OurPrice}</td>
                                    <td className="px-2 border border-gray-300">
                                        <div className="flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => handleQuantityChange(item._id, 'decrease')}
                                                className="px-2 py-1 border border-gray-400 rounded hover:bg-gray-200 cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item._id, 'increase')}
                                                className="px-2 py-1 border border-gray-400 rounded hover:bg-gray-200 cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-2 border border-gray-300">
                                        ₹{item.OurPrice * item.quantity}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={order.length + 1} className="text-center py-10 text-gray-600 text-lg border border-white">
                                    Your shopping cart is empty.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Payment & Order Details */}
            <div className='grid grid-cols-2 gap-4 mt-5'>
                {/* Online Payment Section */}
                <div className='flex mx-25 bg-gray-100 p-5 w-[40rem] border border-gray-300'>
                    {/* Radio button */}
                    <input type="radio" name="payment" className="mr-2" />

                    {/* Text */}
                    <span className='font-medium'>Online Payment</span>

                    {/* Payment Logos */}
                    <div>
                        <img src={pay_icons} className='w-110 mx-2'/>
                    </div>
                </div>

                <div className='mx-20 bg-gray-100 p-5 flex justify-center border border-gray-300'>
                    Order Details
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
