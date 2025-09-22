import React, { useEffect, useState } from 'react';
import { BillingApiGet } from '../../ApiServer/BillingDetailsApi';
import pay_icons from '../../../assets/img/pay_icons.png';
import { getAddress } from '../../ApiServer/ShippingAddress';
import { useNavigate } from 'react-router-dom';

function OrderSummary() {
  const orderHeaders = [
    "Product", "Description", "Avail.", "List Price", "Discount(%)", "Our Price", "Qty", "Total"
  ];

  const [Address, setAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [giftWrap, setGiftWrap] = useState(false);
  const [comments, setComments] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await getAddress();
        const address = Array.isArray(data.addresses) && data.addresses.length > 0
          ? data.addresses[0] : null;
        setAddress(address);
      } catch (error) {
        console.error("Error fetching shipping address:", error);
      }
    };
    fetchAddress();
  }, []);

  useEffect(() => {
    const fetchBillingItems = async () => {
      try {
        const data = await BillingApiGet();
        const items = Array.isArray(data)
          ? data
          : data.billing || data.books || [];
        setCartItems(items.map(item => ({ ...item, quantity: item.quantity || 1 })));
      } catch (err) {
        console.error("Error fetching billing items:", err);
      }
    };
    fetchBillingItems();
  }, []);

  const itemsTotal = cartItems.reduce((total, item) => total + (item.OurPrice * item.quantity), 0);
  const shipping = 40;
  const giftCharge = giftWrap ? (cartItems.length * 15) : 0;
  const grandTotal = itemsTotal + shipping + giftCharge;

  return (
    <div className='mt-3 mb-3 w-full px-4'>
      <h1 className='text-2xl text-center mb-2 font-semibold'>Shopping Cart Order Summary</h1>
      <div className='w-24 h-0.5 bg-orange-500 mx-auto mb-6'></div>

      {/* Addresses */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6'>
        {[ "Shipping", "Billing" ].map((type, idx) => (
          <div key={idx} className='bg-gray-100 p-4 rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-2'>{type} Address</h2>
            {Address ? (
              <div className='text-gray-700 text-sm'>
                <p>{Address.surName} {Address.firstName} {Address.lastName}</p>
                <p>{Address.address}</p>
                <p>{Address.city} - {Address.zipcode}</p>
                <p>{Address.state}, {Address.country}</p>
                <p>Phone: {Address.mobileno}</p>
                <p>Email: {Address.email}</p>
              </div>
            ) : (
              <p className='text-gray-500'>No {type.toLowerCase()} address available.</p>
            )}
          </div>
        ))}
      </div>

      {/* Billing Items Table */}
      <div className='overflow-x-auto mb-6'>
        <table className='min-w-full border border-gray-300 text-sm'>
          <thead>
            <tr className='bg-orange-500 text-white font-semibold text-center'>
              {orderHeaders.map((header, idx) => (
                <th key={idx} className='px-2 py-3 border border-gray-300'>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? cartItems.map((item, idx) => (
              <tr key={idx} className='text-center border-t border-gray-300'>
                <td className='px-2 py-2 border border-gray-300'>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
                    alt={item.Product}
                    className='h-16 w-16 mx-auto object-contain'
                  />
                </td>
                <td className='px-2 border border-gray-300'>{item.Description}</td>
                <td className='px-2 border border-gray-300 text-green-600 font-bold'>{item.Availability}</td>
                <td className='px-2 border border-gray-300'>₹{item.Price}</td>
                <td className='px-2 border border-gray-300'>{item.Discount}%</td>
                <td className='px-2 border border-gray-300'>₹{item.OurPrice}</td>
                <td className='px-2 border border-gray-300'>{item.quantity}</td>
                <td className='px-2 border border-gray-300'>₹{item.OurPrice * item.quantity}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={orderHeaders.length} className='text-center py-10 text-gray-600'>
                  Your shopping cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Payment & Order Details */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Payment & Delivery Section */}
        <div className='bg-gray-100 border border-gray-300 rounded-lg p-4 shadow w-full'>
          {/* Online Payment */}
          <div className='flex items-center border-b border-gray-400 py-3'>
            <input type="radio" name="payment" className='mr-2' defaultChecked />
            <span className='font-medium'>Online Payment</span>
            <img src={pay_icons} className='w-110 ml-2' />
          </div>

          {/* Standard Delivery */}
          <div className='border-b border-gray-400 py-3'>
            <input type="radio" name='Delivery' className='mr-2' defaultChecked />
            <span className='font-medium'>Standard Delivery</span>
            <p className='text-sm mt-1'>
              Usually delivers in 3 - 7 days by Indian Post or Courier. Track & Trace available.
            </p>
          </div>

          {/* Comments */}
          <div className='border-b border-gray-400 py-3'>
            <p className='font-bold'>Enter your comments:</p>
            <input
              type="text"
              placeholder=''
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className='w-full border border-gray-300 mt-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
            />
          </div>

          {/* Gift Wrap */}
          <div className='flex items-center border-b border-gray-400 py-3'>
            <input
              type="checkbox"
              id="giftWrap"
              checked={giftWrap}
              onChange={(e) => setGiftWrap(e.target.checked)}
              className='w-4 h-4 accent-blue-600'
            />
            <label htmlFor="giftWrap" className='ml-2 font-medium'>Packed as Gift</label>
          </div>

          {/* Terms & Conditions */}
          <div className='py-3'>
            <div className='flex items-center'>
              <input type="checkbox" id='terms' className='w-4 h-4' />
              <span className='ml-2 text-sm'>
                I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer"
                  className='text-orange-500 underline hover:text-orange-600'>terms & conditions</a>.
              </span>
            </div>
          </div>
        </div>

        {/* Order Details Section */}
        <div className='bg-gray-100 border border-gray-300 rounded-lg p-4 shadow w-full'>
          <div className='text-xl font-semibold border-b pb-2 flex justify-center'>Order Details</div>
          <table className='w-full mt-4 text-gray-700'>
            <tbody>
              <tr className='border-b border-gray-400'>
                <td className='p-2 border-r border-gray-400'>Items</td>
                <td className='p-2 text-right'>{cartItems.length}</td>
              </tr>
              <tr className='border-b border-gray-400'>
                <td className='p-2 border-r border-gray-400'>Total Amount</td>
                <td className='p-2 text-right'>₹{itemsTotal}</td>
              </tr>
              <tr className='border-b border-gray-400'>
                <td className='p-2 border-r border-gray-400'>Shipping Charges</td>
                <td className='p-2 text-right'>₹{shipping}</td>
              </tr>
              <tr className='border-b border-gray-400 font-medium'>
                <td className='p-2 border-r border-gray-400'>Gift Packing</td>
                <td className='p-2 text-right'>₹{giftCharge}</td>
              </tr>
              <tr className='border-b border-gray-400 font-bold text-gray-800'>
                <td className='p-2 border-r border-gray-400'>Grand Total</td>
                <td className='p-2 text-right'>₹{grandTotal}</td>
              </tr>
            </tbody>
          </table>

          <div className='flex justify-center mt-4'>
            <button
              onClick={() => navigate("/payment", { state: { grandTotal } })}
              className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded cursor-pointer'
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
