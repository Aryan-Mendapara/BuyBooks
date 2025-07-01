import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import ImagesApi from '../ApiServer/ImagesApi';

const BestSellerImg = () => {
  const [books, setBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState(12);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    image: null,
    imageUrl: ''
  });

  useEffect(() => {
    fetchBooksFromServer();
  }, []);

  const fetchBooksFromServer = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: file, imageUrl });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveToServer = async () => {
    if (!formData.title || !formData.author || !formData.description || !formData.image) {
      alert("Please fill all fields");
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('author', formData.author);
      data.append('description', formData.description);
      data.append('image', formData.image);

      await ImagesApi(data);

      alert("Book saved to server successfully!");
      setFormData({ title: '', author: '', description: '', image: null, imageUrl: '' });
      setShowPopup(false);

      fetchBooksFromServer(); // refresh book list

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to save book.");
    }
  };

  const handleLoadMore = () => {
    setVisibleBooks(prev => Math.min(prev + 12, books.length));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-600 hover:text-orange-500">Home</Link>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-800">Best Sellers</span>
      </div>

      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-2xl font-bold pb-1 border-b-2 border-orange-500">
          Best Sellers
        </h1>
        <button
          onClick={() => setShowPopup(true)}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
        >
          Add Images
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start pt-10 z-50 overflow-y-auto'>
          <div className='bg-white w-[90%] max-w-4xl rounded shadow-lg p-6 relative'>
            <button
              onClick={() => setShowPopup(false)}
              className='absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl cursor-pointer'
            >
              ✕
            </button>
            <h2 className='text-xl font-bold mb-4 text-center'>Add New Book</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleFormChange} 
                placeholder="Title" 
                className="border p-2 rounded w-full" 
              />
              <input 
                name="author" 
                value={formData.author} 
                onChange={handleFormChange} 
                placeholder="Author" 
                className="border p-2 rounded w-full" 
              />
              <input 
                name="description" 
                value={formData.description} 
                onChange={handleFormChange} 
                placeholder="Description" 
                className="border p-2 rounded w-full" 
              />
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                onChange={handleFormChange} 
                className="border p-2 rounded w-full cursor-pointer" 
              />
            </div>

            <div className='text-center'>
              <button onClick={handleSaveToServer} className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer'>
                Save Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sort and Total */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span>Sort:</span>
          <select className="border p-2 rounded">
            <option value="">--Select--</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
        <div className="text-gray-600">
          Total ({books.length} results)
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {books.slice(0, visibleBooks).map((book) => (
          <div key={book._id} className="group relative border border-gray-300 hover:shadow-lg transition-shadow">
            <div className="relative mb-4 overflow-hidden px-4 pt-2">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${book.image}`}
                alt={book.title}
                className="w-60 h-60 object-cover"
              />
              <div className="absolute inset-0 bg-opacity-40 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-t flex items-center justify-center gap-2 hover:bg-orange-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <FaShoppingCart />
                  Add to cart
                </button>
              </div>
            </div>
            <div className='px-4'>
              <h3 className="text-sm font-medium mb-1">{book.title}</h3>
              <span className="text-lg font-bold text-orange-500">₹{book.price || 'N/A'}</span>
              <span className="text-sm text-gray-500 line-through ml-2">₹{book.originalPrice || ''}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleBooks < books.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors"
          >
            Load More Books
          </button>
        </div>
      )}
    </div>
  );
};

export default BestSellerImg;
