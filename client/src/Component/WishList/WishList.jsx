import React, { useEffect, useState } from 'react';
import { wishlistApiDelete, wishlistApiGet } from '../ApiServer/WishListApi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaShoppingCart } from 'react-icons/fa';
import {  BillingApiPost } from '../ApiServer/BillingDetailsApi';
import { useSelector } from 'react-redux';
import { addToBillingDetails } from '../Redux/Slice/BillingDetailsSlice';

const WishList = () => {
  const wishlistHeaders = ["Product", "Description", "Availability", "Action"];
  const [wishItems, setWishItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const BillingdetailsItems = useSelector(state => state.billingdetails.items);

  const handleAddToCart = async (book) => {
      const exists = BillingdetailsItems.find(item => item._id === book._id);
      if (exists) {
        alert('Already in cart!');
        return;
      }
  
      try {
        await BillingApiPost(book);
        dispatch(addToBillingDetails(book));
        alert('Added to cart!');
      } catch (error) {
        console.error("Failed to add book to cart:", error);
        alert("Something went wrong while adding the book to the cart.");
      }
    };

  useEffect(() => {
  const fetchWishlistItems = async () => {
    try {
      const response = await wishlistApiGet();
      console.log("✅ Wishlist full response:", response);
      
      const books =
        response?.data?.books ??
        response?.books ??
        [];

      console.log("✅ Extracted books:", books);

      if (Array.isArray(books)) {
        setWishItems(books);
      } else {
        console.warn("⚠️ 'books' is not an array", books);
        setWishItems([]);
      }
    } catch (err) {
      console.error("❌ Error fetching wishlist items:", err);
      setWishItems([]);
    } finally {
      setLoading(false);
    }
  };

  fetchWishlistItems();
}, []);


  const handleDelete = async (id) => {
    try {
      await wishlistApiDelete(id);
      setWishItems(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  return (
    <div className='bg-white px-2 py-8 flex flex-col items-center'>
      <div className='w-[90%] max-w-6xl text-left mb-4'>
        <h2 className='text-3xl'>WishList Summary</h2>
      </div>

      <table className='w-[90%] max-w-6xl border border-gray-300 text-sm'>
        <thead>
          <tr className='bg-orange-500 text-white font-semibold text-center'>
            {wishlistHeaders.map((header, index) => (
              <th key={index} className="px-2 py-3 border border-gray-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={wishlistHeaders.length} className="text-center p-4 text-lg">
                Loading...
              </td>
            </tr>
          ) : wishItems.length > 0 ? (
            wishItems.map((item, idx) => (
              <tr key={item._id || idx} className="text-center text-sm border-t border-gray-300">
                <td className='p-2 border border-gray-300'>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${item.image?.replace(/\\/g, '/')}`}
                    alt={item.title || 'No title'}
                    className="h-16 w-16 mx-auto object-contain"
                  />
                </td>
                <td className='p-2 border border-gray-300'>
                  <div className='font-medium'>{item.title?.replace(/"/g, '') || 'No title'}</div>
                </td>
                <td className='p-2 border border-gray-300'>
                  <div className='text-green-500'>In Stock</div>
                </td>
                <td className='p-2 flex justify-center gap-2'>
                  <button 
                    className='bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 cursor-pointer'
                    onClick={() => handleAddToCart(book)}
                  >
                    <FaShoppingCart size={20} />
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 cursor-pointer'
                    onClick={() => handleDelete(item._id)}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={wishlistHeaders.length} className="text-center p-4 text-lg">
                No Record Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WishList;
