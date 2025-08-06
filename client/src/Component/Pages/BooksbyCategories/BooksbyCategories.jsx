import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const categories = [
    "ACTION & ADVENTURE",
    "AGRICULTURAL",
    "ARTS, FILM & PHOTOGRAPHY",
    "AUTHORS COMBO",
    "AWARD WINNING BOOKS",
    "BESTSELLERS",
    "BOX SET",
    "BUSINESS & ECONOMICS",
];

const BooksbyCategories = () => {
    const [selected, setSelected] = useState(null);

    return (
        <div className="text-center bg-black/80 py-10">
            {/* Title */}
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-white">Books by Categories</h2>
                <div className="w-64 h-0.5 bg-orange-500 mx-auto mt-2"></div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-20">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`relative group font-semibold py-4 rounded shadow-md border-b-4 border-y-4 border-gray-400 cursor-pointer transition-all duration-200
                        ${selected === index ? 'bg-orange-500 text-white' : 'bg-white text-black hover:scale-105'}`}
                        onClick={() => setSelected(index)}
                    >
                        {category}

                        {/* Hover Action Button */}
                        <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">                            
                            <button
                                className="w-full h-full border border-orange-500 hover:bg-orange-400 transition-colors px-6 py-2 font-semibold cursor-pointer"
                            >
                                {category}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Categories Button */}
            <div className="mt-8">
                <button
                    className="text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors px-6 py-2 font-semibold cursor-pointer"
                >
                    VIEW ALL CATEGORIES
                </button>
            </div>
        </div>
    );
};

export default BooksbyCategories;
