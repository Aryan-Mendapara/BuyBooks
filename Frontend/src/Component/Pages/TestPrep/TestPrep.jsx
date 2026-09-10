import React, { useContext, useEffect, useState } from 'react'
import { ImagesApiDelete, ImagesApiGet } from '../../ApiServer/BooksDetailsApi';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { ThemeContext } from '../../ThemeContext/ThemeContext';

const TestPrep = () => {
  const { darkMode } = useContext(ThemeContext);
  const [books, setBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState(12);

  useEffect(() => {
    fetchBooksFromServer();
  }, []);

  const fetchBooksFromServer = async () => {
    try {
      const response = await ImagesApiGet('testprep');
      console.log("Books Get response:", response);
      setBooks(response.books || []);
    } catch (error) {
      console.error("Error loading books: ", error);
    }
  };

  const navigate = useNavigate();
  const handleAddImages = () => {
    navigate("/addImages");
  }

  const handleLoadMore = () => {
    setVisibleBooks(prev => Math.min(prev + 12, books.length));
  };

  const handleDeleteImages = async (bookId) => {
    try {
      const response = await ImagesApiDelete(bookId);
      console.log(("Books Delete response:", response));
      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
    } catch (error) {
      console.log("Error Delete books: ", error);
    }
  }

  const handleEdit = (e, book) => {
    e.stopPropagation(); // prevent triggering navigate on card
    // Navigate to an edit page or open a modal with book data
    navigate(`/editbook/${book._id}`, { state: { book } });
  };

  return (
    <div className={`text-center ${darkMode ? "bg-black/90 text-white" : "text-black"}`}>
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4 text-gray-400">
          <Link
            to="/"
            className="hover:text-orange-500"
          >
            Home
          </Link>
          <span>&gt;</span>
          <span>Test Prep</span>
        </div>

        <div className='flex justify-between items-center mb-6'>
          <h1 className="text-2xl font-bold pb-1 border-b-2 border-orange-500">
            Test Prep
          </h1>
          <button
            onClick={handleAddImages}
            className='bg-blue-600 text-white px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base lg:px-6 lg:py-3 lg:text-lg rounded hover:bg-blue-700 transition cursor-pointer'
          >
            Add Images
          </button>
        </div>

        {/* Sort and Total */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span>Sort:</span>
            <select className="border p-2 rounded cursor-pointer">
              <option value="" className='text-black'>--Select--</option>
              <option value="price-low" className='text-black'>Price: Low to High</option>
              <option value="price-high" className='text-black'>Price: High to Low</option>
              <option value="newest" className='text-black'>Newest First</option>
            </select>
          </div>

          <div className="text-gray-600">
            Total ({books.length} results)
          </div>
        </div>

        {/* Desktop & large screens */}
        {/* Book Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-[68rem] mx-15 gap-6">
          {books.slice(0, visibleBooks).map((book) => (
            <div
              key={book._id}
              className="group relative border border-gray-300 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/images-details/${book._id}`)}
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

              {/* Book Image Container with Overlay */}
              <div className="relative mb-4 overflow-hidden px-4 pt-2">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${book.image}`}
                  alt={book.title}
                  className="w-60 h-60 object-cover"
                />

                {/* Overlay with Cart Button */}
                <div className="absolute inset-0 bg-opacity-40 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-t flex items-center justify-center gap-2 hover:bg-orange-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <FaShoppingCart />
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Book Details */}
              <div className='px-4'>
                <h3 className="text-sm font-medium mb-1">{book.title}</h3>
                <span className="text-lg font-bold text-orange-500">₹{book.price || 'N/A'}</span>
                <span className="text-sm text-gray-500 line-through ml-2">₹{book.originalPrice || ''}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & small screens */}
        {/* Books Grid */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.slice(0, visibleBooks).map((book) => (
            <div
              key={book._id}
              className="group relative border border-gray-300 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/images-details/${book._id}`)}
            >
              {/* Edit Button */}
              <div className='absolute top-2 left-2 bg-black text-white px-1 py-1 rounded-sm z-10 cursor-pointer'>
                <MdEdit size={20} />
              </div>

              {/* Delete Button */}
              <div
                onClick={() => handleDeleteImages(book._id)}
                className='absolute top-2 left-10 bg-black text-white px-1 py-1 rounded-sm z-10 cursor-pointer'
              >
                <MdDelete size={20} />
              </div>

              {/* Discount Badge */}
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-sm z-10">
                {book.discount}% OFF
              </div>

              {/* Book Image Container with Overlay */}
              <div className="relative mb-4 overflow-hidden px-4 pt-2">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${book.image}`}
                  alt={book.title}
                  className="w-full h-100"
                />
              </div>

              {/* Book Details */}
              <div className='px-4'>
                <h3 className="text-sm font-medium mb-1 h-auto">
                  {book.title}
                </h3>
                <span className="text-lg font-bold text-orange-500">₹{book.price}</span>
                <span className="text-sm text-gray-500 line-through ml-2">₹{book.originalPrice}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleBooks < books.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors"
            >
              Load More Books
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPrep
