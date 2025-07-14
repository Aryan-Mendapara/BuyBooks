import React, { useEffect, useState } from 'react';
import schoolbooks from '../../assets/img/schoolbooks.jpg';
import bestseller from '../../assets/img/bestseller.jpg';
import BBIchildrenandadult from '../../assets/img/BBIchildrenandadult.jpg';
import BBIJournal from '../../assets/img/BBIJournal.jpg';
import governmentbook from '../../assets/img/governmentbook.jpg';
import testpep from '../../assets/img/testpep.jpg';
import advitbanner from '../../assets/img/advitbanner.jpg';
import boxsets from '../../assets/img/boxsets.jpg';
import BBIDiscountOffer from '../../assets/img/BBIDiscountOffer.jpg';
import PopularAuthor from '../../assets/img/PopularAuthor.png';
import BBILanguagesbanner from '../../assets/img/BBILanguagesbanner.jpg'
import NewArrivals from './NewArrivals';
import BestSeller from './bestsellers';
import SchoolBooks from './SchoolBooks';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import FictionNonFictionBooks from './FictionNonFictionBooks';
import BooksbyCategories from './BooksbyCategories';
import { Link } from 'react-router-dom';

function Home() {
  const images = [
    { id: 1, name: "schoolbooks", path: '/schoolbooksimg', src: schoolbooks },
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
    <div>
      {/* Image Slider */}
      <div className="w-full h-[500px] overflow-hidden relative">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className='absolute top-1/2 -translate-y-1/2 z-10 bg-black/70 p-5 shadow cursor-pointer'
        >
          <FaChevronLeft className='text-xl text-white' />
        </button>

        {/* Slide Image */}
        {/* <img
          src={images[currentIndex]}
          alt="Slide"
          className="w-full h-full object-cover transition-all duration-700"
        />*/}

        <Link to={images[currentIndex].path}>
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].name}
            className="w-full h-full object-cover transition-all duration-700"
          />
        </Link>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 p-5 shadow cursor-pointer'
        >
          <FaChevronRight className='text-xl text-white' />
        </button>
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
