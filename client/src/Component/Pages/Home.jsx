import React, { useEffect, useState } from 'react';
import schoolbooks from '../../assets/img/schoolbooks.jpg';
import bestseller from '../../assets/img/bestseller.jpg';
import BBIDiscountOffer from '../../assets/img/BBIDiscountOffer.jpg';

import NewArrivals from './NewArrivals';
import BestSeller from './bestsellers';
import SchoolBooks from './SchoolBooks';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Home() {
  const images = [
    schoolbooks, 
    bestseller
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext(); // reuse next function
    }, 3000);

    return () => clearInterval(timer); // cleanup
  }, [currentIndex, isAnimating]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div>
      {/* Image Slider */}
      <div className="w-full h-[400px] overflow-hidden relative">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className='absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white transition'
        >
          <FaChevronLeft className='text-xl text-gray-700' />
        </button>

        {/* Slide Image */}
        <img
          src={images[currentIndex]}
          alt="Slide"
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className='absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white transition'
        >
          <FaChevronRight className='text-xl text-gray-700' />
        </button>
      </div>

      {/* New Arrivals & Best Sellers */}
      <div>
        <NewArrivals />
        <BestSeller />
      </div>

      {/* Advertisement */}
      <div>
        <img
          src={BBIDiscountOffer}
          className='w-full object-cover'
          alt="BBIDiscountOffer"
        />
      </div>

      {/* School Books Section */}
      <SchoolBooks />
    </div>
  );
}

export default Home;
