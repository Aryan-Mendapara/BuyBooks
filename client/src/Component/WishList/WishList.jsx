import React, { useContext, useEffect, useState } from 'react';
import { wishlistApiDelete, wishlistApiGet } from '../ApiServer/WishListApi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaShoppingCart } from 'react-icons/fa';
import { BillingApiPost } from '../ApiServer/BillingDetailsApi';
import { useSelector, useDispatch } from 'react-redux';
import { addToBillingDetails } from '../Redux/Slice/BillingDetailsSlice';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const WishList = () => {
  const { darkMode } = useContext(ThemeContext);

  const wishlistHeaders = ["Product", "Description", "Availability", "Action"];
  const [wishItems, setWishItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const BillingdetailsItems = useSelector(state => state.billingdetails.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await wishlistApiGet();
        const books = response?.data?.books ?? response?.books ?? [];
        setWishItems(Array.isArray(books) ? books : []);
      } catch (err) {
        console.error("Error fetching wishlist items:", err);
        setWishItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistItems();
  }, []);

  const handleAddToCart = async (item) => {
    const exists = BillingdetailsItems.find(item => item._id === book._id);
    if (exists) {
      alert('Already in cart!');
      return;
    }

    // 👉 Map wishlist data into BillingDetails expected format
    const billingPayload = {
      title: item.title,
      author: item.author || "Unknown Author",
      Publisher: item.Publisher || "Unknown Publisher",
      price: item.price || 0,
      originalPrice: item.originalPrice || 0,
      discount: item.discount || 0,
      image: item.image
    };

    try {
      await BillingApiPost(billingPayload); // send formatted object
      dispatch(addToBillingDetails(billingPayload));

      // delete from wishlist after adding to cart
      await wishlistApiDelete(item._id);
      setWishItems(prev => prev.filter(w => w._id !== item._id));

      alert("Moved to cart!");
    } catch (err) {
      console.error("Failed to move item:", err);
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await wishlistApiDelete(id);
      setWishItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error deleting wishlist item:", err);
    }
  };

  return (
    <div className={darkMode ? 'bg-black/90 text-white' : 'bg-white text-black'}>
      <div className='px-4 py-8'>
        <div className="w-full max-w-6xl text-left mb-4 px-2">
          <h2 className="text-3xl font-semibold">WishList Summary</h2>
        </div>

        {/* Responsive Table */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm hidden md:table">
            <thead>
              <tr className="bg-orange-500 text-white font-semibold text-center">
                {wishlistHeaders.map((header, idx) => (
                  <th key={idx} className="px-2 py-3 border border-gray-300">{header}</th>
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
              ) : wishItems.length === 0 ? (
                <tr>
                  <td colSpan={wishlistHeaders.length} className="text-center p-4 text-lg">
                    No Record Found
                  </td>
                </tr>
              ) : (
                wishItems.map((item, idx) => (
                  <tr key={item._id || idx} className="text-center border-t border-gray-300">
                    <td className="p-2 border border-gray-300">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${item.image?.replace(/\\/g, '/')}`}
                        alt={item.title || "No title"}
                        className="h-16 w-16 mx-auto object-contain"
                      />
                    </td>
                    <td className="p-2 border border-gray-300">{item.title?.replace(/"/g, '') || 'No title'}</td>
                    <td className="p-2 border border-gray-300 text-green-500">In Stock</td>
                    <td className="p-2 flex justify-center gap-2">
                      <button
                        className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 cursor-pointer"
                        onClick={() => handleAddToCart(item)}
                      >
                        <FaShoppingCart size={20} />
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Mobile / Tablet View */}
          <div className="flex flex-col gap-4 md:hidden">
            {loading ? (
              <p className="text-center text-lg">Loading...</p>
            ) : wishItems.length === 0 ? (
              <p className="text-center text-lg">No Record Found</p>
            ) : (
              wishItems.map((item, idx) => (
                <div key={item._id || idx} className="border rounded-lg p-4 shadow-sm flex flex-col gap-2">
                  <div className="flex justify-center mb-2">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${item.image?.replace(/\\/g, '/')}`}
                      alt={item.title || "No title"}
                      className="h-24 w-24 object-contain"
                    />
                  </div>
                  <div className="font-semibold text-lg">{item.title?.replace(/"/g, '') || 'No title'}</div>
                  <div className="text-green-500">In Stock</div>
                  <div className="flex justify-center gap-2 mt-2">
                    <button
                      className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 cursor-pointer"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FaShoppingCart size={20} />
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 cursor-pointer"
                      onClick={() => handleDelete(item._id)}
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
