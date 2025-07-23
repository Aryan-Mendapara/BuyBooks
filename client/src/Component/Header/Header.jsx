import React, { useEffect, useState } from 'react';
import logo from "../../assets/img/logo.png";
import { FaHeart, FaHome, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { LoginDelete } from '../ApiServer/LoginApi';

function Header() {
    const categories = [
        { id: 1, name: 'Bestsellers', path: '/bestsellersimg' },
        { id: 2, name: 'New Arrivals', path: '/newarrivalsimg' },
        { id: 3, name: 'Pre Order', path: '/pre-order' },
        { id: 4, name: 'Children & Young Adult', path: '/children-young-adult' },
        { id: 5, name: 'Fiction & Non Fiction', path: '/fiction-non-fiction-booksimg' },
        { id: 6, name: 'School Education', path: '/schoolbooksimg' },
        { id: 7, name: 'Higher Education', path: '/higher-education' },
        { id: 8, name: 'Test Prep', path: '/test-prep' },
        { id: 9, name: 'Games & Puzzles', path: '/games-puzzles' }
    ];

    const [search, setSearch] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token"); // or sessionStorage.getItem if you store there
        setIsLoggedIn(!!token); // true if token exists
    }, []);

    const handleLogout = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (userId) {
                await LoginDelete(userId);
            }

            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            setIsLoggedIn(false); // update state
            navigate('/login');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };


    return (
        <div>
            <div className='bg-white flex top-0 left-0 h-20 items-center justify-between ml-19'>
                {/* Logo */}
                <div>
                    <button onClick={() => navigate('/')}>
                        <img src={logo} alt="Logo" />
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
                    <button className="h-11 px-5 bg-black text-white text-lg font-semibold hover:bg-gray-500 transition cursor-pointer">
                        <FaSearch />
                    </button>
                </div>

                {/* Login/Logout Button */}
                <div className='flex items-center justify-center px-5'>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className='bg-red-500 p-2 rounded-lg cursor-pointer'
                        >
                            <span className='px-3 flex items-center mx-1 text-white hover:text-black'>
                                <FaUser />
                                <span className='ml-2'>Logout</span>
                            </span>
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className='bg-orange-500 p-2 rounded-lg cursor-pointer'
                        >
                            <span className='px-3 flex items-center mx-1 text-white hover:text-black'>
                                <FaUser />
                                <span className='ml-2'>Login</span>
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Navigation Categories */}
            <div className='bg-neutral-700 w-full h-12 text-white flex items-center px-19 overflow-x-auto text-sm'>
                <ul className='flex items-center space-x-6 py-3 overflow-x-auto text-[13px]'>
                    <li>
                        <Link to="/" className='hover:text-orange-500 flex items-center gap-1'>
                            <FaHome className="text-lg" />
                        </Link>
                    </li>
                    {categories.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={item.path}
                                className='hover:text-orange-500 whitespace-nowrap transition-colors duration-200'
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='bg-orange-500 h-full flex items-center justify-center w-12 mx-1 ml-3'>
                    <button onClick={() => navigate('/wishlist')} className='cursor-pointer'>
                        <FaHeart size={20} />
                    </button>
                </div>
                <div className='bg-orange-500 h-full flex items-center justify-center w-12 ml-1'>
                    <button onClick={() => navigate('/billing-details')} className='cursor-pointer'>
                        <FaShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
