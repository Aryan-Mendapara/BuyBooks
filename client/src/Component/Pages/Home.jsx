import React, { useContext, useEffect, useState } from 'react';
import SchoolBooks from '../../assets/img/school-books.jpg';
import bestseller from '../../assets/img/best-seller.jpg';
import BBIchildrenandadult from '../../assets/img/children-and-young-adult.jpg';
import BBIJournal from '../../assets/img/bbi-journal.jpg';
import governmentbook from '../../assets/img/goverment-book.jpg';
import testpep from '../../assets/img/test-pep.jpg';
import advitbanner from '../../assets/img/advitbanner.jpg';
import boxsets from '../../assets/img/box-sets.jpg';
import BBIDiscountOffer from '../../assets/img/BBIDiscountOffer.jpg';
import PopularAuthor from '../../assets/img/PopularAuthor.png';
import BBILanguagesbanner from '../../assets/img/BBILanguagesbanner.jpg'
import NewArrivals from './NewArrivals/NewArrivals';
import BestSeller from './BestSellers/BestSellers';
import SchoolBooks from './SchoolBooks/SchoolBooks';
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

import FictionNonFictionBooks from './FictionNonFiction/FictionNonFictionBooks';
import BooksbyCategories from './BooksbyCategories/BooksbyCategories';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext/ThemeContext';

function Home() {
  const { darkMode } = useContext(ThemeContext);

  const images = [
    { id: 1, name: "schoolbooks", path: '/schoolbooksimg', src: SchoolBooks },
    { id: 2, name: "advitbanner", path: '/games-puzzles', src: advitbanner },
    { id: 3, name: "BBIchildrenandadult", path: '/children-young-adult', src: BBIchildrenandadult },
    { id: 4, name: "bestseller", path: '/bestsellersimg', src: bestseller },
    { id: 5, name: "boxsets", path: '/children-young-adult', src: boxsets },
    { id: 6, name: "testpep", path: '/test-prep', src: testpep },
    { id: 7, name: "governmentbook", path: '/test-prep', src: governmentbook },
    { id: 8, name: "BBIJournal", path: '/test-prep', src: BBIJournal },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext(); // reuse next function
    }, 2000);

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
    <div className={darkMode ? 'bg-black text-white' : 'bg-white text-black'}>
      {/* Image Slider */}
      <div className="w-full overflow-hidden relative">
        {/* Desktop */}
        <div className="hidden md:flex w-full h-full relative items-center justify-center">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className='absolute top-1/2 left-0 -translate-y-1/2 z-10 cursor-pointer'
          >
            <VscChevronLeft className='text-xl text-blue-600' size={80} />
          </button>

          {/* Slide Image */}
          <div className="w-full h-full relative overflow-hidden">
            <div
              className="flex transition-transform duration-800 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {images.map((img) => (
                <Link key={img.id} to={img.path} className="w-full flex-shrink-0">
                  <img
                    src={img.src}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer'
          >
            <VscChevronRight className='text-xl text-blue-600' size={80} />
          </button>
        </div>

        {/* Mobile */}
        <div className='md:hidden'>
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className='absolute top-1/2 left-0 -translate-y-1/2 z-10 cursor-pointer'
          >
            <VscChevronLeft className='text-blue-600' size={40} />
          </button>

          {/* Slide Image */}
          <div
            className="flex transition-transform duration-800 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((img) => (
              <Link key={img.id} to={img.path} className="w-full flex-shrink-0">
                <img
                  src={img.src}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
              </Link>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer'
          >
            <VscChevronRight className='text-blue-600' size={40} />
          </button>
        </div>
      </div>

      {/* New Arrivals & Best Sellers */}
      <div>
        <NewArrivals />
        <BestSeller />
      </div>

      {/* Advertisement */}
      <div className='w-auto'>
        <img
          src={BBIDiscountOffer}
          className='w-full object-cover'
        />
      </div>

      {/* School Books Section */}
      <SchoolBooks />

      {/* Advertisement */}
      <div className='w-auto'>
        <img
          src={PopularAuthor}
          className='w-full object-cover'
        />
      </div>

      {/* Fiction & Non Fiction Books */}
      <FictionNonFictionBooks />

      {/* Advertisement */}
      <div className='w-auto'>
        <img
          src={BBILanguagesbanner}
          className='w-full object-cover'
        />
      </div>

      {/* Books by Categories */}
      <BooksbyCategories />
    </div>
  );
}

export default Home;
