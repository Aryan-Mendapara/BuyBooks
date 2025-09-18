import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import { ImagesApiDelete, ImagesApiGet } from '../../ApiServer/BooksDetailsApi';
import { useDispatch, useSelector } from 'react-redux';
import { BillingApiPost } from '../../ApiServer/BillingDetailsApi';
import { addToBillingDetails } from '../../Redux/Slice/BillingDetailsSlice';

const BestSeller = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookList, setBookList] = useState([]);
  const [booksToShow, setBooksToShow] = useState(5);
  const slideBy = 1;

  const navigate = useNavigate();

  const dispatch = useDispatch();
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

  // ✅ Fetch Books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await ImagesApiGet('bestseller');
        setBookList(data.books || []);
      } catch (error) {
        console.error("Failed to load books:", error);
      }
    };
    fetchBooks();
  }, []);

  // ✅ Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnimating, bookList]);

  // ✅ Update booksToShow based on screen size
  useEffect(() => {
    const updateBooksToShow = () => {
      if (window.innerWidth < 768) {
        setBooksToShow(2); // mobile
      } else {
        setBooksToShow(5); // desktop
      }
    };

    updateBooksToShow(); // run on mount
    window.addEventListener("resize", updateBooksToShow);

    return () => window.removeEventListener("resize", updateBooksToShow);
  }, []);

  // ✅ Next
  const handleNext = () => {
    if (isAnimating || bookList.length <= booksToShow) return;
    setIsAnimating(true);

    const maxIndex = bookList.length - booksToShow;
    setCurrentIndex((prevIndex) =>
      prevIndex + slideBy > maxIndex ? 0 : prevIndex + slideBy
    );

    setTimeout(() => setIsAnimating(false), 500);
  };

  // ✅ Prev
  const handlePrev = () => {
    if (isAnimating || bookList.length <= booksToShow) return;
    setIsAnimating(true);

    const maxIndex = bookList.length - booksToShow;
    setCurrentIndex((prevIndex) =>
      prevIndex - slideBy < 0 ? maxIndex : prevIndex - slideBy
    );

    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNavigate = () => {
    navigate('/bestsellersimg');
  };

  const handleDeleteImages = async (bookId) => {
    try {
      await ImagesApiDelete(bookId);
      setBookList(prevBooks => prevBooks.filter(book => book._id !== bookId));
    } catch (error) {
      console.log("Error Delete books: ", error);
    }
  };

  const handleEdit = (e, book) => {
    e.stopPropagation(); // prevent triggering navigate on card
    // Navigate to an edit page or open a modal with book data
    navigate(`/editbook/${book._id}`, { state: { book } });
  };

  return (
    <div className='bg-gray-100 text-center'>
      <div className="max-w-6xl mx-auto px-2 py-4">
        {/* Title */}
        <div className="text-center mb-6">
          {/* Desktop & larger screens */}
          <div className="hidden md:block">
            <h2 className="text-4xl font-bold">Bestseller Books</h2>
            <div className="w-68 h-0.5 bg-orange-500 mx-auto mt-2"></div>
          </div>

          {/* Mobile & small screens */}
          <div className="md:hidden">
            <h2 className="text-3xl font-bold">Bestseller Books</h2>
            <div className="w-57 h-0.5 bg-orange-500 mx-auto mt-2"></div>
          </div>
        </div>

        <div className="relative overflow-hidden">
          {/* Desktop & larger screens */}
          <div className='hidden md:block'>
            {/* Prev */}
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-1.5 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft className="text-xl text-gray-600" />
            </button>

            {/* Books Row */}
            <div>
              <div
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (208 + 24)}px)`,
                  width: 'max-content'
                }}
              >
                {bookList.map((book) => (
                  <div
                    key={book._id}
                    className="w-52 flex-shrink-0 group relative border border-gray-300 hover:shadow-lg transition-shadow cursor-pointer"

                  >
                    {/* Edit */}
                    <div
                      onClick={(e) => handleEdit(e, book)}
                      className='absolute top-2 left-2 bg-black text-white px-1 py-1 rounded-sm z-10 cursor-pointer'
                    >
                      <MdEdit size={20} />
                    </div>

                    {/* Delete */}
                    <div
                      onClick={(e) => handleDeleteImages(book._id)}
                      className='absolute top-2 left-10 bg-black text-white px-1 py-1 rounded-sm z-10 cursor-pointer'
                    >
                      <MdDelete size={20} />
                    </div>

                    <div
                      onClick={() => navigate(`/addtocart/${book._id}`)}
                      className="flex flex-col h-full"
                    >

                      {/* Discount Badge */}
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-sm z-10">
                        {book.discount}% OFF
                      </div>

                      {/* Book Image */}
                      <div className="relative mb-4 overflow-hidden px-4 pt-2">
                        <div className="relative pb-[133%]">
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/${book.image}`}
                            alt={book.title}
                            className="absolute inset-0 w-60 h-60 object-contain"
                          />
                        </div>

                        {/* Cart Button */}
                        <div className="absolute inset-0 bg-opacity-40 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            className="w-full bg-orange-500 text-white py-2 px-4 rounded-t flex items-center justify-center gap-2 hover:bg-orange-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(book);
                            }}
                          >
                            <FaShoppingCart />
                            Add to cart
                          </button>
                        </div>
                      </div>

                      {/* Book Details */}
                      <div className="px-4 pb-4">
                        <h3 className="text-sm font-medium mb-2 line-clamp-2 min-h-[2.5rem]">
                          {book.title}
                        </h3>
                        <div className="mt-auto">
                          <span className="text-lg font-bold text-orange-500">₹{book.price}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">₹{book.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next */}
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-1.5 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronRight className="text-xl text-gray-600" />
            </button>
          </div>


          {/* Mobile & small screens */}
          <div className='md:hidden'>
            {/* Slider Container */}
            <div className="relative overflow-hidden">
              {/* Prev */}
              <button
                onClick={handlePrev}
                disabled={isAnimating}
                className="absolute left-0.5 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-1 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronLeft className="text-xl text-gray-600" />
              </button>

              {/* Books Row */}
              <div className="overflow-hidden">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${(currentIndex * 100) / 2}%)`,
                    width: `${(bookList.length * 100) / 2}%`,
                  }}
                >
                  {bookList.map((book) => (
                    <div
                      key={book._id}
                      className="flex-shrink-0 w-30 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ml-3.5 group relative border border-gray-300 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      {/* Edit */}
                      <div
                        onClick={(e) => handleEdit(e, book)}
                        className="absolute top-1 left-1 bg-black text-white px-1 py-1 rounded-sm z-10 cursor-pointer"
                      >
                        <MdEdit size={15} />
                      </div>

                      {/* Delete */}
                      <div
                        onClick={() => handleDeleteImages(book._id)}
                        className="absolute top-1 left-7 bg-black text-white px-1 py-1 rounded-sm z-10 cursor-pointer"
                      >
                        <MdDelete size={15} />
                      </div>

                      <div
                        onClick={() => navigate(`/addtocart/${book._id}`)}
                        className="flex flex-col h-full"
                      >
                        {/* Discount Badge */}
                        <div className="absolute top-1 right-0.5 bg-red-600 text-white px-0.5 py-0.5 text-xs rounded-sm z-10">
                          {book.discount}% OFF
                        </div>

                        {/* Book Image */}
                        <div className="relative mb-4 overflow-hidden px-4 pt-2">
                          <div className="relative pb-[133%]">
                            <img
                              src={`${import.meta.env.VITE_BACKEND_URL}/${book.image}`}
                              alt={book.title}
                              className="absolute inset-0 w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        {/* Book Details */}
                        <div className="px-4 pb-4">
                          <h3 className="text-sm font-medium mb-2 line-clamp-2 min-h-[2.5rem]">{book.title}</h3>
                          <div className="mt-auto">
                            <span className="text-lg font-bold text-orange-500">₹{book.price}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">₹{book.originalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next */}
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="absolute right-0.5 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-1 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronRight className="text-xl text-gray-600" />
              </button>
            </div>

          </div>
        </div>

        {/* View More */}
        <div className='text-center mt-6'>
          <button
            onClick={handleNavigate}
            className='inline-block bg-orange-500 cursor-pointer text-white px-4 py-2 text-sm rounded hover:bg-orange-600 transition-colors'
          >
            VIEW MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
