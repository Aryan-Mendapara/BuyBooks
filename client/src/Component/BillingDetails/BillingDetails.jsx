import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BillingApiDelete, BillingApiGet } from '../ApiServer/BillingDetailsApi';

const BillingDetails = () => {
  const order = [
    "Product",
    "Description",
    "Avail.",
    "List Price",
    "Discount(%)",
    "Our Price",
    "Qty",
    "Total",
    "Delete"
  ];

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      await BillingApiDelete(id);
      setCartItems(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.OurPrice * item.quantity, 0)
    : 0;

  return (
    <div className="bg-gray-100 flex flex-col items-center py-10">
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
                <td className="px-2 border border-gray-300">{item.Availability}</td>
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
                <td className="px-2 border border-gray-300">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="hover:underline cursor-pointer"
                  >
                    <RiDeleteBin6Line size={25} />
                  </button>
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

        {cartItems.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan={order.length - 1} className="border border-gray-300"></td>
              <td className="text-right text-lg font-semibold py-2 pr-8 border border-gray-300">
                Total: ₹{totalPrice}
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      <div className='flex gap-4'>
        <button
          className="mt-6 px-6 py-2 bg-white border border-gray-400 hover:bg-gray-100 transition rounded text-sm font-medium cursor-pointer"
          onClick={() => navigate('/')}
        >
          Continue shopping
        </button>

        <button
          className='mt-6 px-6 py-2 bg-white border border-gray-400 hover:bg-gray-100 transition rounded text-sm font-medium cursor-pointer'
          onClick={() => navigate('/shipping-address')}
        >
          Continue Checkout
        </button>
      </div>
    </div>
  );
};

export default BillingDetails;
