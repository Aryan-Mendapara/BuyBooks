import React, { useState } from 'react'
import logo from "../../assets/img/logo.png"
import { FaHeart, FaHome, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header() {
    const categories = [
        "Bestsellers",
        "New Arrivals",
        "Pre Order",
        "Children & Young Adult",
        "Fiction & Non Fiction",
        "School Education",
        "Higher Education",
        "Test Prep",
        "Games & Puzzles"
    ];

    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    return (
        <div>
            <div className='bg-white flexed top-0 left-0 w-full h-20 flex items-center justify-between px-19 '>
                {/* Logo */}
                <div className='px-2'>
                    <button
                        onClick={() => {navigate('/')}}
                    >
                        <img src={logo} />
                    </button>                    
                </div>
                {/* Search Bar */}
                <div className='flex items-center border border-black max-w-xl w-full rounded-lg overflow-hidden'>
                    <input
                        type="text"
                        placeholder='Search by title, author or ISBN here...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full max-w-[600px] min-w-[350px] h-10 text-lg outline-none px-5 placeholder-gray-500'
                    />
                    <button className="h-11 px-5 bg-black text-white text-lg font-semibold  hover:bg-gray-500 transition cursor-pointer">
                        <FaSearch />
                    </button>
                </div>
                {/* Login */}
                <div className='flex items-center justify-center px-5'>
                    <button
                        onClick={() => {navigate('/login')}}
                        className='bg-orange-500 p-2 rounded-lg cursor-pointer'
                    >
                        <span className='px-3 flex items-center mx-1 text-white hover:text-black'><FaUser />
                            <span className='ml-2'>
                                Login
                            </span>
                        </span>
                    </button>
                </div>
            </div>
            <div className='bg-neutral-700 w-full h-12 text-white flex items-center px-19 overflow-x-auto text-sm'>
                <div>
                    <button 
                        onClick={() => {navigate('/')}}
                        className='cursor-pointer mr-1'
                    >
                        <FaHome size={20} />
                    </button>                    
                </div>
                {categories.map((category, index) => (                
                    <button
                        key={index}
                        className='px-5 py-2 h-full flex items-center hover:bg-orange-500'
                    >
                        {category}
                    </button>
                ))}
                <div className='bg-orange-500 h-full flex items-center justify-center w-12'>                    
                    <button
                        onClick={() => {navigate('/login')}}
                        className='cursor-pointer'
                    >
                        <FaHeart size={20} />
                    </button>                    
                </div>
                <div className='bg-orange-500 h-full flex items-center justify-center w-12 ml-1'>
                    <button
                        className='cursor-pointer'
                    >
                    <FaShoppingCart size={20} />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Header
