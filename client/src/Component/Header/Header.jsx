import React, { useState, useContext } from 'react';
import logo from "../../assets/img/logo.png";
import { FaHeart, FaHome, FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { TbLogout, TbMoon, TbSun } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { LoginDelete } from '../ApiServer/LoginApi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Slice/authSlice';
import { ThemeContext } from '../ThemeContext/ThemeContext';

function Header() {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const navigate = useNavigate();
    const wishlistCount = useSelector((state) => state.wishlist?.items?.length);
    const cartCount = useSelector((state) => state.billingdetails?.items?.length);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (userId) await LoginDelete(userId);
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            dispatch(logout());
            setMenuOpen(false);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleAccount = () => {
        setMenuOpen(false);
        navigate("/my-account");
    };

    const headerBg = darkMode ? 'bg-black/90 text-white' : 'bg-white text-black';
    const navBg = darkMode ? 'bg-black/85 text-white' : 'bg-neutral-700 text-white';
    const inputBg = darkMode ? 'text-white placeholder-gray-300' : 'bg-white text-black placeholder-gray-500';
    const iconColor = darkMode ? 'text-white' : 'text-black';

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

    return (
        <div>
            {/* Top Header */}
            <div className={`${headerBg} flex flex-col md:flex-row items-center justify-between px-3 md:px-8 py-3 gap-3`}>
                {/* Logo */}
                <div className="flex justify-center items-center w-full md:w-auto">
                    <button
                        onClick={() => navigate('/')}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-10 md:h-12 cursor-pointer"
                        />
                    </button>
                </div>

                {/* Search Bar */}
                <div className={`flex items-center border rounded-lg overflow-hidden w-full md:max-w-xl ${darkMode ? 'border-gray-600' : 'border-black'}`}>
                    <input
                        type="text"
                        placeholder="Search by title, author or ISBN..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`flex-1 h-full text-sm md:text-lg outline-none px-3 md:px-5 ${inputBg}`}
                    />
                    <button className="h-10 md:h-11 px-4 md:px-5 bg-black/70 text-white text-lg hover:bg-black/90 transition cursor-pointer">
                        <FaSearch />
                    </button>
                </div>

                {/* Dark Mode Toggle + Mobile Menu + Login */}
                <div className='flex items-center gap-4'>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full border border-gray-400 cursor-pointer"
                    >
                        {darkMode ? <TbSun size={20} /> : <TbMoon size={20} />}
                    </button>

                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className={`${iconColor} md:hidden text-2xl`}
                    >
                        {mobileMenu ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Login / Logout */}
                    <div className="md:flex items-center justify-between px-4">
                        {isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="bg-orange-500 p-2 rounded-full cursor-pointer"
                                >
                                    <span className="px-3 flex items-center text-white hover:text-black">
                                        <FaUser />
                                    </span>
                                </button>
                                {menuOpen && (
                                    <div className={`absolute right-0 mt-2 w-40 shadow-lg rounded-lg overflow-hidden z-50 
                                                    ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}>
                                        <button
                                            onClick={handleAccount}
                                            className={`block w-full text-left px-4 py-2 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} cursor-pointer`}
                                        >
                                            <span className="flex items-center mx-1">
                                                <FaUser />
                                                <span className="ml-2">Account</span>
                                            </span>
                                        </button>
                                        
                                        <button
                                            onClick={handleLogout}
                                            className={`block w-full text-left px-4 py-2 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} cursor-pointer`}
                                        >
                                            <span className="flex items-center mx-1">
                                                <TbLogout size={20} />
                                                <span className="ml-2">Logout</span>
                                            </span>
                                        </button>
                                    </div>
                                )}

                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-orange-500 p-2 rounded-lg cursor-pointer"
                            >
                                <FaUser className={iconColor} /> Login
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Categories Navigation */}
            <div className={`${navBg} w-full`}>
                {/* Desktop & Tablet Nav */}
                <div className="hidden sm:flex items-center h-12 px-3 md:px-6 text-sm overflow-x-auto scrollbar-hide">
                    <ul className="flex items-center space-x-4 md:space-x-6">
                        <li>
                            <Link
                                to="/"
                                className={`hover:text-orange-500 flex items-center gap-1`}
                            >
                                <FaHome className="text-lg" />
                            </Link>
                        </li>
                        {categories.map((item) => (
                            <li
                                key={item.id}
                                className="whitespace-nowrap"
                            >
                                <Link
                                    to={item.path}
                                    className="hover:text-orange-500"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Wishlist + Cart */}
                    <div className="flex ml-auto">
                        <div className={`relative bg-orange-500 h-12 w-12 flex items-center justify-center mx-1`}>
                            <button
                                onClick={() => isLoggedIn ? navigate('/wishlist') : navigate('/login')}
                                className="relative cursor-pointer"
                            >
                                <FaHeart size={20} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className={`relative bg-orange-500 h-12 w-12 flex items-center justify-center mx-1 `}>
                            <button
                                onClick={() => isLoggedIn ? navigate('/billing-details') : navigate('/login')}
                                className="relative cursor-pointer"
                            >
                                <FaShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                {mobileMenu && (
                    <div className="sm:hidden flex flex-col p-4 space-y-4">
                        <Link
                            to="/"
                            onClick={() => setMobileMenu(false)}
                            className="flex items-center gap-2 hover:text-orange-500"
                        >
                            <FaHome />
                            Home
                        </Link>

                        {categories.map(item => (
                            <Link
                                key={item.id}
                                to={item.path}
                                onClick={() => setMobileMenu(false)}
                                className="hover:text-orange-500"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Wishlist + Cart */}
                        <div className="flex gap-6 mt-4">
                            <button
                                onClick={() => { setMobileMenu(false); isLoggedIn ? navigate('/wishlist') : navigate('/login') }}
                                className="relative"
                            >
                                <FaHeart size={22} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => { setMobileMenu(false); isLoggedIn ? navigate('/billing-details') : navigate('/login') }}
                                className="relative"
                            >
                                <FaShoppingCart size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
