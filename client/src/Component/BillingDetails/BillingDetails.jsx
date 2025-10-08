import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BillingApiDelete, BillingApiGet } from '../ApiServer/BillingDetailsApi';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const BillingDetails = () => {
  const { darkMode } = useContext(ThemeContext);

  const order = [
    "Product", "Description", "Avail.", "List Price",
    "Discount(%)", "Our Price", "Qty", "Total", "Delete"
  ];

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBillingItems = async () => {
      try {
        const data = await BillingApiGet();
        const items = Array.isArray(data) ? data : data.billing || data.books || [];
        setCartItems(items.map(item => ({ ...item, quantity: item.quantity || 1 })));
      } catch (err) {
        console.error("Error fetching billing items:", err);
      }
    };
    fetchBillingItems();
  }, []);

  const handleQuantityChange = (id, action) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(1, action === 'increase' ? item.quantity + 1 : item.quantity - 1) }
          : item
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await BillingApiDelete(id);
      setCartItems(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.OurPrice * item.quantity, 0);

  return (
    <div className={darkMode ? 'bg-black/90 text-white' : 'bg-white text-black'}>
    <div className="py-10 flex flex-col items-center px-2">
      {/* Desktop / Laptop Table */}
      <div className="hidden md:block w-full max-w-6xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-500 text-white text-sm text-center font-semibold">
              {order.map((title, i) => (
                <th 
                  key={i} 
                  className="px-2 py-3 border border-gray-300"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {cartItems.length ? (
              cartItems.map(item => (
                <tr 
                  key={item._id} 
                  className="text-center text-sm border-t border-gray-300"
                >
                  <td className="px-2 py-2 border border-gray-300">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
                      alt={item.Product}
                      className="h-16 w-16 mx-auto object-contain"
                      onClick={() => navigate(`/images-details/${item._id}`)}
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
                        className="px-2 py-1 border rounded hover:bg-gray-200"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => handleQuantityChange(item._id, 'increase')}
                        className="px-2 py-1 border rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>                    
                  </td>
                  
                  <td className="px-2 border border-gray-300">₹{item.OurPrice * item.quantity}</td>
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
                <td 
                  colSpan={order.length} 
                  className={`text-center py-10 text-lg border border-gray-300 ${darkMode ? 'text-gray-100' : 'text-gray-600'} `}
                >
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
      </div>

      {/* Mobile / Tablet Card View */}
      <div className="md:hidden w-full max-w-md flex flex-col gap-4">
        {cartItems.length ? cartItems.map(item => (
          <div 
            key={item._id} 
            className="border rounded shadow p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <img 
                src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`} 
                alt={item.Product} 
                className="h-20 w-20 object-contain"
                // onClick={() => navigate(`/images-details/${item._id}`)}
              />

              <button 
                onClick={() => handleDelete(item._id)}
              >
                <RiDeleteBin6Line size={25} className="text-red-600"/>
              </button>
            </div>

            <div className="text-sm">
              <p className="font-semibold">{item.Description}</p>
              <p>Availability: {item.Availability}</p>
              <p>Price: ₹{item.OurPrice} ({item.Discount}% off)</p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleQuantityChange(item._id, 'decrease')} 
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button 
                  onClick={() => handleQuantityChange(item._id, 'increase')} 
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>

              <span className="font-semibold">₹{item.OurPrice * item.quantity}</span>
            </div>
          </div>
        )) : (
          <p className={`border rounded text-center py-10 text-lg ${darkMode ? 'text-gray-100' : 'text-gray-600'}`}>Your shopping cart is empty.</p>
        )}
      </div>

      {/* Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 mt-6'>
        <button
          className={`px-6 py-2 border border-gray-400 ${darkMode ? 'hover:bg-black' : 'hover:bg-gray-300'} transition rounded text-sm font-medium cursor-pointer`}
          onClick={() => navigate('/')}
        >
          Continue shopping
        </button>

        <button
          className='px-6 py-2 bg-orange-500 hover:bg-orange-600 transition rounded text-sm font-medium cursor-pointer'
          onClick={() => cartItems.length > 0 ? navigate('/shipping-address') : alert("Please add items to your cart before checkout.")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
    </div>
  );
};

export default BillingDetails;
