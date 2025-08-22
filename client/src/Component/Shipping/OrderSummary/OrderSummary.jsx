import React, { useEffect, useState } from 'react';
import { BillingApiGet } from '../../ApiServer/BillingDetailsApi';
import pay_icons from '../../../assets/img/pay_icons.png';
import { getAddress } from '../../ApiServer/ShippingAddress';

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

    const [Address, setAddress] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [giftWrap, setGiftWrap] = useState(false);
    const [comments, setComments] = useState('');

    useEffect(() => {
        const ShippingAddress = async () => {
            try {
                const data = await getAddress();

                const address = Array.isArray(data.addresses)
                    && data.addresses.length > 0 ? data.addresses[0]
                    : null;
                setAddress(address);
            } catch (error) {
                console.error("❌ Error fetching shipping address:", error);
            }
        }

        ShippingAddress();
    }, []);

    useEffect(() => {
        const fetchBillingItems = async () => {
            try {
                const data = await BillingApiGet();

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

    // 📌 Calculations
    const itemsTotal = cartItems.reduce((total, item) => total + (item.OurPrice * item.quantity), 0);
    const shipping = 40;
    const giftCharge = giftWrap ? (cartItems.length * 15) : 0;
    const grandTotal = itemsTotal + shipping + giftCharge;

    return (
        <div className='mt-3 mb-3'>
            <div>
                <h1 className='flex justify-center mb-1 text-2xl'>Shopping Cart Order Summary</h1>
                <div className='w-82 h-0.5 bg-orange-500 mx-auto mt-2'></div>
            </div>

            {/* Address */}
            <div className='grid grid-cols-2 mt-4 gap-4 w-[90%] mx-auto'>
                {/* Shipping Address */}
                <div className='bg-gray-100 p-4 rounded-lg'>
                    <h1 className='text-xl font-semibold mb-2'>Shipping Address</h1>
                    {Address ? (
                        <div className='text-gray-700'>
                            <p>{Address.surName} {Address.firstName} {Address.lastName}</p>
                            <p>{Address.address}</p>
                            <p>{Address.city} - {Address.zipcode}</p>
                            <p>{Address.state}, {Address.country}</p>
                            <p>Phone: {Address.mobileno}</p>
                            <p>Email: {Address.email}</p>
                        </div>
                    ) : (
                        <p className='text-gray-500'>No shipping address available.</p>
                    )}
                </div>

                {/* Billing Address */}
                <div className='bg-gray-100 p-4 rounded-lg'>
                    <h1 className='text-xl font-semibold mb-2'>Billing Address</h1>
                    {Address ? (
                        <div className='text-gray-700'>
                            <p>{Address.surName} {Address.firstName} {Address.lastName}</p>
                            <p>{Address.address}</p>
                            <p>{Address.city} - {Address.zipcode}</p>
                            <p>{Address.state}, {Address.country}</p>
                            <p>Phone: {Address.mobileno}</p>
                            <p>Email: {Address.email}</p>
                        </div>
                    ) : (
                        <p className='text-gray-500'>No billing address available.</p>
                    )}
                </div>
            </div>

            {/* BillingDetails Table */}
            <div className="flex flex-col items-center py-10 mt-5">
                <table className="w-[90%] max-w-6xl">
                    <thead>
                        <tr className="bg-orange-500 text-white font-semibold text-sm text-center">
                            {order.map((title, index) => (
                                <th key={index} className="px-2 py-3 border border-gray-300">{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, idx) => (
                                <tr key={idx} className="text-center text-sm border-t border-gray-300 items-center">
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
                                    <td className="px-2 border border-gray-300">{item.quantity}</td>
                                    <td className="px-2 border border-gray-300">₹{item.OurPrice * item.quantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={order.length} className="text-center py-10 text-gray-600 text-lg">
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
                <div className='mx-25 bg-gray-100 w-[45rem] border border-gray-300 rounded-lg shadow'>

                    {/* Online Payment */}
                    <div className='flex items-center border-b border-gray-400 p-5'>
                        {/* Radio button */}
                        <input type="radio" name="payment" className="mr-2" defaultChecked />

                        {/* Text */}
                        <span className='font-medium'>Online Payment</span>

                        {/* Payment Logos */}
                        <div>
                            <img src={pay_icons} className='w-131 mx-2' />
                        </div>
                    </div>

                    {/* Standard Delivery */}
                    <div className='p-5 border-b border-gray-400'>
                        {/* Radio button */}
                        <input type="radio" name='Delivery' className='mr-2' defaultChecked />

                        {/* Text */}
                        <span className='font-medium'>Standard Delivery</span>

                        <p className='text-sm mt-2'>
                            Usually delivers in 3 -7 days by Indian Post or Courier. This service has Track & Trace facility.
                        </p>
                    </div>

                    <div className='p-5 border-b border-gray-400'>
                        <p className='font-bold text-xl'>Enter your comments here:</p>

                        <input
                            type="text"
                            placeholder=''
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className='w-full border border-gray-300 bg-white mt-2 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                        />
                    </div>

                    {/* Packed as Gift */}
                    <div className='p-5 border-b border-gray-400 flex items-center'>
                        <input
                            type="checkbox"
                            id="giftWrap"
                            checked={giftWrap}
                            onChange={(e) => setGiftWrap(e.target.checked)}
                            className='w-4 h-4 accent-blue-600'
                        />
                        <label htmlFor="giftWrap" className='ml-2 font-medium'>
                            Packed as Gift
                        </label>
                    </div>

                    <div className='p-5'>
                        <p className='font-bold'>Terms & Conditions : </p>
                        <p className='text-sm mt-2 text-gray-700'>
                            Please acknowledge the terms and conditions bound to this order by ticking the following box.
                        </p>

                        <div className='flex items-center'>
                            <input
                                type="checkbox"
                                id='terms'
                                className='w-4 h-4'
                            />
                            <span className='ml-2 text-sm'>
                                I have read and agreed to the{" "}
                                <a
                                    href="/terms-and-conditions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-500 underline hover:text-orange-600"
                                >
                                    terms and conditions
                                </a>{" "}
                                bound to this order.
                            </span>
                        </div>

                    </div>
                </div>

                {/* Order Details Section */}
                <div className='mx-40 w-[25rem] bg-gray-100 border border-gray-300 rounded-lg shadow'>
                    {/* Title */}
                    <div className='text-xl font-semibold border-b pb-2 flex justify-center p-5 border-gray-400'>
                        Order Details
                    </div>

                    {/* Table */}
                    <table className='w-full text-lg border-collapse'>
                        <tbody className='text-gray-700'>
                            {/* Items */}
                            <tr className='border-b border-gray-400'>
                                <td className='p-4 border-r border-gray-400 w-1/2'>Items</td>
                                <td className='p-4 text-right w-1/2'>{cartItems.length}</td>
                            </tr>

                            {/* Total Amount */}
                            <tr className='border-b border-gray-400'>
                                <td className='p-4 border-r border-gray-400'>Total Amount</td>
                                <td className='p-4 text-right'>₹{itemsTotal}</td>
                            </tr>

                            {/* Shipping Charges */}
                            <tr className='border-b border-gray-400'>
                                <td className='p-4 border-r border-gray-400'>Shipping Charges</td>
                                <td className='p-4 text-right'>₹{shipping}</td>
                            </tr>

                            {/* Gift Packing Charges */}
                            <tr className='border-b border-gray-400 font-medium'>
                                <td className='p-4 border-r border-gray-400'>Gift Packing</td>
                                <td className='p-4 text-right'>₹{giftCharge}</td>
                            </tr>

                            <tr className='border-b border-gray-400 font-bold text-gray-800'>
                                <td className='p-4 border-r border-gray-400'>Grand Total</td>
                                <td className='p-4 text-right'>₹{grandTotal}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Order Button */}
                    <div className='flex justify-center'>
                        <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded m-5 cursor-pointer'>
                            Order Now
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default OrderSummary;
