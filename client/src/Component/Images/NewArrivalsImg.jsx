import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { books } from '../data/ImageData';

const NewArrivalsImg = () => {
  // State for visible books
  const [visibleBooks, setVisibleBooks] = useState(12);

  // Handle load more
  const handleLoadMore = () => {
    setVisibleBooks(prev => Math.min(prev + 12, books.length));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-600 hover:text-orange-500">Home</Link>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-800">New Arrivals</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-orange-500 inline-block">
        New Arrivals
      </h1>

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {books.slice(0, visibleBooks).map((book) => (
          <div key={book.id} className="group relative border border-gray-300 hover:shadow-lg transition-shadow ">
            {/* Discount Badge */}
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-sm z-10">
              {book.discount}% OFF
            </div>

            {/* Book Image Container with Overlay */}
            <div className="relative mb-4 overflow-hidden px-4 pt-2">
              <img
                src={book.image}
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

      {/* Load More Button */}
      {visibleBooks < books.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            Load More Books
          </button>
        </div>
      )}
    </div>
  )
}

export default NewArrivalsImg
