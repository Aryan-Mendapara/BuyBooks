import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import useBookList from '../../Utils/useBookList';

const FictionNonFictionBooksImg = () => {
  const navigate = useNavigate();
  
  const handleAddImages = () => {
    navigate("/addImages");
  };

  const {
    books,
    visibleBooks,
    loading,
    error,
    handleLoadMore,
    handleDeleteImages
  } = useBookList('fiction');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-center">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-600 hover:text-orange-500">Home</Link>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-800">Fiction & Non Fiction Books</span>
      </div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-2xl font-bold pb-2 border-b-2 border-orange-500 inline-block">
          Fiction & Non Fiction Books
        </h1>
        <button
          onClick={handleAddImages}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer'
        >
          Add Images
        </button>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          {/* Sort and Results Count */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <span>Sort:</span>
              <select className="border p-2 rounded">
                <option value="">--Select--</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
            <div className="text-gray-600">
              Total ({books.length} results)
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-[68rem] mx-15 gap-6">
            {books.slice(0, visibleBooks).map((book) => (
              <div
                key={book._id}
                className="group relative border border-gray-300 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/addtocart/${book._id}`)}
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
                    src={`${import.meta.env.VITE_BACKEND_URL}/${book.image}`}
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
                  <h3 className="text-sm font-medium mb-1 h-auto">
                    {book.title}
                  </h3>

                  {/* Price */}
                  <span className="text-lg font-bold text-orange-500">₹{book.price}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">₹{book.originalPrice}</span>
                </div>
              </div>
            ))}
          </div>
          {visibleBooks < books.length && (
            <button onClick={handleLoadMore} className="mt-6 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">Load More</button>
          )}
        </>
      )}
    </div>
  );
}

export default FictionNonFictionBooksImg
