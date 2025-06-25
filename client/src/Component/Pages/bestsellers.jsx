import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { books } from '../data/ImageData'

const BestSeller = () => {
  return (
    <div className='bg-white text-center py-10 max-w-6xl mx-auto'>
      {/* Title */}
      <div className='mb-6 text-center'>
        <h2 className='text-4xl font-bold'>
          Bestseller Books
        </h2>
        <div className='w-68 h-1 bg-orange-500 mx-auto mt-2'></div>
      </div>

      {/* Slider Container */}
      <div className='relative overflow-clip'>
        {/* Previous Button */}
        {/* <button 
        >
          <FaChevronLeft />
        </button> */}

        {/* Books Row Container */}
        <div>
          <div
            className='flex gap-6 transition-transform duration-500 ease-in-out'
          >
            {books.map((book) => (
              <div
                key={book.id}
                className='w-52 flex-shrink-0 group relative border border-gray-300 hover:shadow-lg transition-shadow'
              >
                {/* Discount Badge */}
                <div className='absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-sm z-10'>
                  {book.discount}% OFF
                </div>

                {/* Book Image Container with Overlay */}
                <div className='relative mb-4 overflow-hidden px-4 pt-2'>
                  <div className="relative pb-[133%]">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className='absolute inset-0 w-60 h-60 object-contain'
                    />
                  </div>
                  {/* Overlay with Cart Button */}
                  <div className='absolute inset-0 bg-opacity-40 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <button className='w-full bg-orange-500 text-white py-2 px-4 rounded-t flex items-center justify-center gap-2 hover:bg-orange-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestSeller
