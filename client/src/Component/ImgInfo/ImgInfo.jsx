import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ImagesApiGet } from '../ApiServer/BooksDetailsApi';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { BillingApiPost } from '../ApiServer/BillingDetailsApi';
import { wishlistApiPost } from '../ApiServer/WishListApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../Redux/Slice/wishlistSlice';
import { addToBillingDetails } from '../Redux/Slice/BillingDetailsSlice';

const ImgInfo = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const BillingdetailsItems = useSelector(state => state.billingdetails.items);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await ImagesApiGet();
      const foundBook = data.books?.find(b => b._id === id);
      setBook(foundBook);
    };
    fetchBook();
  }, [id]);

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

  const handleAddWishlist = async () => {
    const exists = wishlistItems.find(item => item._id === book._id);
    if (exists) {
      alert('Already in wishlist!');
      return;
    }

    try {
      await wishlistApiPost(book); 
      dispatch(addToWishlist(book));
      alert('Added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert("Something went wrong while adding to wishlist.");
    }
  };

  if (!book) return <div className="mt-20 text-center text-gray-600">Loading...</div>;

  return (
    <div className="px-6 md:px-20 py-4 flex flex-col md:flex-row gap-10">
      <div className='border border-gray-400 p-5 flex-shrink-0'>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${book.image?.replace(/\\/g, '/')}`}
          alt={book.title}
          className="h-80 w-60 object-contain mx-auto"
        />
      </div>

      <div className='flex justify-center'>
        <div>
          <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
          <p className="text-black/80 mb-2"><span className='font-bold'>Author :</span> {book.author}</p>
          <p className="text-black/80 mb-2"><span className='font-bold'>Publisher :</span> {book.Publisher}</p>

          <div className='flex gap-2 items-center mb-2'>
            <p className="text-orange-500 text-2xl font-semibold">
              ₹{book.price}
              <span className='text-xl text-gray-500 line-through mx-2'>₹{book.originalPrice}</span>
            </p>
            <p className='bg-yellow-500 text-white px-2 py-1 text-sm rounded'>
              {book.discount}% OFF
            </p>
          </div>

          <p className="mb-2"><span className='font-bold'>Availability :</span> Available</p>
          <p><span className='font-bold'>Shipping-Time :</span> Usually Ships 1-3 Days</p>

          <div className='flex gap-3'>
            {/* Buy Now */}
            <button
              onClick={() => {
                handleAddToCart(book);
                navigate('/billing-details');
              }}
              className='mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer'
            >
              <span className='flex items-center gap-2'>
                <FaShoppingCart />
                <span>Buy Now</span>
              </span>
            </button>

            {/* Add to Cart */}
            <button
              onClick={() => handleAddToCart(book)}
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer"
            >
              <span className='flex items-center gap-2'>
                <FaShoppingCart />
                <span>Add to Cart</span>
              </span>
            </button>
          </div>

          {/* Add to Wishlist */}
          <button
            onClick={handleAddWishlist}
            className='mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer'
          >
            <span className='flex items-center gap-2'>
              <FaHeart />
              <span>Add WishList</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImgInfo;
