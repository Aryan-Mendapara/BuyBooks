import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBooksApi } from '../../ApiServer/BooksDetailsApi';
import { ThemeContext } from '../../ThemeContext/ThemeContext';
import { FaSearch, FaBook, FaUser, FaBuilding, FaRupeeSign } from 'react-icons/fa';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        const searchQuery = searchParams.get('q');
        if (searchQuery) {
            setQuery(searchQuery);
            performSearch(searchQuery);
        }
    }, [searchParams]);

    const performSearch = async (searchQuery) => {
        if (!searchQuery.trim()) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await SearchBooksApi(searchQuery);
            setSearchResults(response.books || []);
        } catch (error) {
            setError('Failed to search books. Please try again.');
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
        }
    };

    const bgColor = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
    const cardBg = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
    const inputBg = darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300';

    return (
        <div className={`min-h-screen ${bgColor}`}>
            <div className="container mx-auto px-4 py-8">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">Search Books</h1>
                    
                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="max-w-2xl">
                        <div className={`flex items-center border rounded-lg overflow-hidden ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                            <input
                                type="text"
                                placeholder="Search by title, author or publisher..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className={`flex-1 h-12 text-lg outline-none px-4 ${inputBg}`}
                            />
                            <button 
                                type="submit"
                                className="h-12 px-6 bg-orange-500 text-white hover:bg-orange-600 transition cursor-pointer"
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </form>

                    {/* Search Query Display */}
                    {searchParams.get('q') && (
                        <p className="mt-4 text-lg">
                            Search results for: <span className="font-semibold text-orange-500">"{searchParams.get('q')}"</span>
                        </p>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <div className="text-red-500 text-lg">{error}</div>
                    </div>
                )}

                {/* Search Results */}
                {!loading && !error && (
                    <>
                        {searchResults.length > 0 ? (
                            <div>
                                <p className="text-lg mb-6">
                                    Found {searchResults.length} book{searchResults.length !== 1 ? 's' : ''}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {searchResults.map((book) => (
                                        <div key={book._id} className={`${cardBg} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}>
                                            {/* Book Image */}
                                            <div className="h-64 bg-gray-200 relative">
                                                {book.image ? (
                                                    <img 
                                                        src={`${import.meta.env.VITE_BACKEND_URL}/${book.image}`}
                                                        alt={book.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <FaBook className="text-6xl text-gray-400" />
                                                    </div>
                                                )}
                                                
                                                {/* Discount Badge */}
                                                {book.discount > 0 && (
                                                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                                                        {book.discount}% OFF
                                                    </div>
                                                )}
                                            </div>

                                            {/* Book Details */}
                                            <div className="p-4">
                                                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                                                    {book.title}
                                                </h3>
                                                
                                                {book.author && (
                                                    <div className="flex items-center mb-2 text-sm text-gray-600">
                                                        <FaUser className="mr-2" />
                                                        <span>{book.author}</span>
                                                    </div>
                                                )}
                                                
                                                {book.Publisher && (
                                                    <div className="flex items-center mb-3 text-sm text-gray-600">
                                                        <FaBuilding className="mr-2" />
                                                        <span>{book.Publisher}</span>
                                                    </div>
                                                )}

                                                {/* Price */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xl font-bold text-orange-500">
                                                            <FaRupeeSign className="inline" />
                                                            {book.price}
                                                        </span>
                                                        {book.originalPrice > book.price && (
                                                            <span className="text-sm text-gray-500 line-through">
                                                                <FaRupeeSign className="inline" />
                                                                {book.originalPrice}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Category */}
                                                <div className="mt-3">
                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {book.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            searchParams.get('q') && (
                                <div className="text-center py-12">
                                    <FaSearch className="text-6xl text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">No books found</h3>
                                    <p className="text-gray-600">
                                        No books match your search for "{searchParams.get('q')}". 
                                        Try different keywords or check your spelling.
                                    </p>
                                </div>
                            )
                        )}
                    </>
                )}

                {/* Initial State */}
                {!searchParams.get('q') && !loading && (
                    <div className="text-center py-12">
                        <FaSearch className="text-6xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Search for Books</h3>
                        <p className="text-gray-600">
                            Enter a book title, author name, or publisher to find books in our collection.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
