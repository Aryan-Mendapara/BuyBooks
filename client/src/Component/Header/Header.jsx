import React, { useState } from 'react';
import logo from "../../assets/img/logo.png";
import { FaHeart, FaHome, FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
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
    const [mobileMenu, setMobileMenu] = useState(false);

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

    return (
        <div>
            {/* Top Header */}
            <div className="bg-white flex flex-col md:flex-row items-center justify-between px-3 md:px-8 py-3 gap-3">

                {/* Logo + Mobile Menu Toggle */}
                <div className="flex justify-center items-center w-full md:w-auto">
                    <button onClick={() => navigate('/')}>
                        <img src={logo} alt="Logo" className="h-10 md:h-12" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="flex items-center border border-black rounded-lg overflow-hidden w-full md:max-w-xl">
                    <input
                        type="text"
                        placeholder="Search by title, author or ISBN here..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-10 text-sm md:text-lg outline-none px-3 md:px-5 placeholder-gray-500"
                    />
                    <button className="h-10 md:h-11 px-4 md:px-5 bg-black text-white text-lg font-semibold hover:bg-gray-500 transition">
                        <FaSearch />
                    </button>
                </div>

                {/* Login + Menu */}
                <div className='flex justify-between gap-45'>
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="md:hidden text-2xl"
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
                                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                                        <button
                                            onClick={handleAccount}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <span className="flex items-center mx-1">
                                                <FaUser />
                                                <span className="ml-2">Account</span>
                                            </span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
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
                                <span className="px-3 flex items-center mx-1 text-white hover:text-black">
                                    <FaUser />
                                    <span className="ml-2">Login</span>
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Categories Navigation */}
            <div className="bg-neutral-700 w-full text-white">
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center h-12 px-6 text-sm">
                    <ul className="flex items-center space-x-6">
                        <li>
                            <Link to="/" className="hover:text-orange-500 flex items-center gap-1">
                                <FaHome className="text-lg" />
                            </Link>
                        </li>
                        {categories.map((item) => (
                            <li key={item.id}>
                                <Link
                                    to={item.path}
                                    className="hover:text-orange-500 whitespace-nowrap"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Wishlist + Cart */}
                    <div className="flex ml-auto">
                        <div className="relative bg-orange-500 h-12 flex items-center justify-center w-12 mx-1">
                            <button
                                onClick={() => isLoggedIn ? navigate('/wishlist') : navigate('/login')}
                                className="relative"
                            >
                                <FaHeart size={20} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>
                        </div>
                        <div className="relative bg-orange-500 h-12 flex items-center justify-center w-12 mx-1">
                            <button
                                onClick={() => isLoggedIn ? navigate('/billing-details') : navigate('/login')}
                                className="relative"
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

                {/* Mobile Nav (collapsible) */}
                {mobileMenu && (
                    <div className="md:hidden flex flex-col bg-neutral-700 text-white p-4 space-y-4">
                        {/* Home */}
                        <button
                            onClick={() => navigate('/')}
                            className="relative"
                        >
                            <FaHome className="text-lg" />                            
                        </button>
                        {categories.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className="hover:text-orange-500"
                                onClick={() => setMobileMenu(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex gap-4 mt-4">
                            {/* Wishlist */}
                            <button
                                onClick={() => isLoggedIn ? navigate('/wishlist') : navigate('/login')}
                                className="relative"
                            >
                                <FaHeart size={20} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>
                            {/* Cart */}
                            <button
                                onClick={() => isLoggedIn ? navigate('/billing-details') : navigate('/login')}
                                className="relative"
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
                )}
            </div>
        </div>
    );
}

export default Header;
