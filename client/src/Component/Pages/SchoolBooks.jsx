import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { ImagesApiDelete, ImagesApiGet } from '../ApiServer/NewArrivalImgApi';
import { MdDelete, MdEdit } from 'react-icons/md';

const SchoolBooks = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();

  const booksToShow = 5;
  const slideBy = 1;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await ImagesApiGet();
        // const filtered = data.books?.filter(book => book.category === 'bestseller');
        // setBookList(filtered || []);
        setBookList(data.books || []);
      } catch (error) {
        console.error("Failed to load books:", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex + slideBy >= bookList.length - booksToShow ? 0 : prevIndex + slideBy
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bookList.length - booksToShow : prevIndex - slideBy
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNavigate = () => {
    navigate('/schoolbooksimg');
  };

  const handleDeleteImages = async (bookId) => {
    try {
      const response = await ImagesApiDelete(bookId);
      console.log(("Books Delete response:", response));
      setBookList(prevBooks => prevBooks.filter(book => book._id !== bookId));
    } catch (error) {
      console.log("Error Delete books: ", error);
    }
  }


  return (
    <div className='bg-white text-center py-10 max-w-6xl mx-auto'>
      {/* title */}
      <div className='mb-6 text-center'>
        <h1 className='text-4xl font-bold'>
          School Books
        </h1>
        <div className='w-56 h-0.5 bg-orange-500 mx-auto mt-2'></div>
      </div>

      {/* Slider Container */}
      <div className='relative overflow-clip'>
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className='absolute cursor-pointer left-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-1.5 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <FaChevronLeft />
        </button>

        {/* Books Container */}
        <div>
          <div
            className='flex gap-6 transition-transform duration-500 ease-in-out'
            style={{
              transform: `translateX(-${currentIndex * (208 + 24)}px)`,
              width: 'max-content',
            }}
          >
            {bookList.map((book) => (
              <div
                key={book._id}
                className='w-50 flex-shrink-0 group relative border border-gray-300 hover:shadow-lg transition-shadow'
              >

                {/* Edit */}
                <div className='absolute top-2 left-2 bg-black text-white px-1 py-1 rounded-sm z-10 cursor-pointer'>
                  <MdEdit size={20} />
                </div>

                {/* Delete */}
                <div
                  onClick={() => handleDeleteImages(book._id)}
                  className='absolute top-2 left-10 bg-black text-white px-1 py-1 rounded-sm z-10 cursor-pointer'
                >
                  <MdDelete size={20} />
                </div>

                {/* Discount */}
                {book.discount && (
                  <div className='absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-sm z-10'>
                    {book.discount}% OFF
                  </div>
                )}

                {/* Image */}
                <div className='relative mb-4 overflow-hidden px-4 pt-2'>
                  <div className='relative pb-[133%]'>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${book.image}`}
                      alt={book.title}
                      className='absolute inset-0 w-60 h-60 object-contain'
                    />
                  </div>

                  {/* Cart Button */}
                  <div className='absolute inset-0 bg-opacity-40 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <button className='w-full bg-orange-500 text-white py-2 px-4 rounded-t flex items-center justify-center gap-2 hover:bg-orange-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                      <FaShoppingCart />
                      Add to cart
                    </button>
                  </div>
                </div>

                {/* Book Info */}
                <div className='px-4'>
                  <h3 className='text-sm font-medium mb-2'>{book.title}</h3>
                  <span className='text-lg font-bold text-orange-500'>₹{book.price}</span>
                  {book.originalPrice && (
                    <span className='text-sm text-gray-500 line-through ml-2'>₹{book.originalPrice}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className='absolute cursor-pointer right-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-1.5 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <FaChevronRight className='text-xl text-gray-600' />
        </button>
      </div>

      {/* View More Button */}
      <div className='text-center mt-6'>
        <button
          onClick={handleNavigate}
          className='inline-block bg-orange-500 text-white px-6 py-2 text-sm rounded hover:bg-orange-600 transition-colors'
        >
          VIEW MORE
        </button>
      </div>

    </div>    
  )
}

export default SchoolBooks