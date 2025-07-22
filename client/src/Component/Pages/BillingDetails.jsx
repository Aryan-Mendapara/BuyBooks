import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";

const BillingDetails = () => {
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
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(groupById(savedCart));
    }, []);

    const groupById = (items) => {
        const map = {};
        items.forEach(item => {
            if (map[item._id]) {
                map[item._id].quantity += 1;
            } else {
                map[item._id] = { ...item, quantity: 1 };
            }
        });
        return Object.values(map);
    };

    const updateLocalStorage = (newItems) => {
        const expanded = newItems.flatMap(item =>
            Array(item.quantity).fill({
                _id: item._id,
                title: item.title,
                image: item.image,
                author: item.author,
                originalPrice: item.originalPrice,
                price: item.price,
                discount: item.discount
            })
        );
        localStorage.setItem("cart", JSON.stringify(expanded));
    };

    const handleQuantityChange = (id, action) => {
        const updated = cartItems.map(item => {
            if (item._id === id) {
                const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: newQty > 1 ? newQty : 1 };
            }
            return item;
        });
        setCartItems(updated);
        updateLocalStorage(updated);
    };

    const handleDelete = (id) => {
        const updated = cartItems.filter(item => item._id !== id);
        setCartItems(updated);
        updateLocalStorage(updated);
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="bg-gray-100 flex flex-col items-center py-10">
            {/* Table Header and Body as Table */}
            <table className="w-[90%] max-w-6xl border border-gray-300">
              <thead>
                <tr className="bg-orange-500 text-white font-semibold text-sm text-center">
                  {order.map((title, index) => (
                    <th key={index} className="px-2 py-3 border border-white">{title}</th>
                  ))}
                  <th className="px-2 py-3 border border-white">Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item, idx) => (
                    <tr key={idx} className="text-center text-sm border-t border-gray-300 items-center">
                      <td className="px-2 border border-white">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
                          alt={item.title}
                          className="h-16 w-16 mx-auto object-contain"
                        />
                      </td>
                      <td className="px-2 border border-white">{item.title}</td>
                      <td className="px-2 border border-white">In stock</td>
                      <td className="px-2 border border-white">₹{item.originalPrice}</td>
                      <td className="px-2 border border-white">{item.discount}%</td>
                      <td className="px-2 border border-white">₹{item.price}</td>
                      <td className="px-2 border border-white">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item._id, 'decrease')}
                            className="px-2 py-1 border border-gray-400 rounded hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item._id, 'increase')}
                            className="px-2 py-1 border border-gray-400 rounded hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-2 border border-white">₹{item.price * item.quantity}</td>
                      <td className="px-2 border border-white">
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
              {/* Table Footer for Total */}
              {cartItems.length > 0 && (
                <tfoot>
                  <tr>
                    <td colSpan={order.length - 1} className="border border-white"></td>
                    <td className="text-right text-lg font-semibold py-2 pr-8 border border-white">
                      Total: ₹{totalPrice}
                    </td>
                    <td className="border border-white"></td>
                  </tr>
                </tfoot>
              )}
            </table>

            {/* Continue Shopping Button */}
            <button
                className="mt-6 px-6 py-2 bg-white border border-gray-400 hover:bg-gray-100 transition rounded text-sm font-medium cursor-pointer"
                onClick={() => navigate('/')}
            >
                Continue shopping
            </button>
        </div>
    );
};

export default BillingDetails;
