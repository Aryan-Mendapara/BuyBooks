import React, { useEffect, useState } from 'react';
import logo from "../../assets/img/logo.png";
import { FaHeart, FaHome, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { LoginDelete } from '../ApiServer/LoginApi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Slice/authSlice';
import { TbLogout } from "react-icons/tb";

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
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const wishlistCount = useSelector((state) => state.wishlist?.items?.length);
    const cartCount = useSelector((state) => state.billingdetails?.items?.length);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (userId) {
                await LoginDelete(userId);
            }
            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            dispatch(logout()); // 👈 update Redux state
            setMenuOpen(false); // Close the menu if open
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleAccount = () => {
        setMenuOpen(false); // Close the menu if open
        navigate("/my-account");
    }


    return (
        <div>
            {/* Top Header */}
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
                <div className='flex items-center justify-center px-10'>
                    {isLoggedIn ? (
                        <div className='relative'>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className='bg-orange-500 p-2 rounded-full cursor-pointer'
                            >
                                <span className='px-3 flex items-center text-white hover:text-black'>
                                    <FaUser />
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                                    <button
                                        onClick={handleAccount}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <span className='flex items-center mx-1'>                                            
                                                <FaUser />
                                            <span className='ml-2'>Account</span>
                                        </span>                                        
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <span className='flex items-center mx-1'>
                                            <TbLogout size={23} />
                                        <span className='ml-2'>Logout</span>
                                        </span>
                                    </button>                                   
                                </div>
                            )}
                        </div>
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

            {/* Categories Navigation */}
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

                {/* Wishlist Icon with Badge */}
                <div className='relative bg-orange-500 h-full flex items-center justify-center w-12 mx-1 ml-3'>
                    <button
                        onClick={() => isLoggedIn ? navigate('/wishlist') : navigate('/login')}
                        className='cursor-pointer relative'
                    >
                        <FaHeart size={20} />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-3.5 -right-3.5 bg-red-600 text-white text-xs font-bold w-7 h-5 flex items-center justify-center rounded-full">
                                {wishlistCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Cart Icon with Badge */}
                <div className='relative bg-orange-500 h-full flex items-center justify-center w-12 ml-1'>
                    <button
                        onClick={() => isLoggedIn ? navigate('/billing-details') : navigate('/login')}
                        className='cursor-pointer relative'
                    >
                        <FaShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-3.5 -right-3.5 bg-red-600 text-white text-xs font-bold w-7 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;