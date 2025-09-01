import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ImagesApiPost } from '../ApiServer/BooksDetailsApi';

function AddBooks() {
  const navigate = useNavigate();
  const { state } = useLocation(); // will contain book if editing
  const isEdit = !!state?.book;

  const Category = [
    "Select Category",
    "newarrival",
    "bestseller",    
    "school",
    "fiction",
    "children",
    "games",
    "higher",
    "testprep",
    "preorder"        
  ]

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    Publisher: '',
    price: '',
    originalPrice: '',
    discount: '',
    category: 'Select Category',
    image: null,
    imageUrl: ''
  });

  // Prefill form if editing
  useEffect(() => {
    if (isEdit) {
      const book = state.book;
      setFormData({
        title: book.title || '',
        author: book.author || '',
        Publisher: book.Publisher || '',
        price: book.price || '',
        originalPrice: book.originalPrice || '',
        discount: book.discount || '',
        category: book.category || 'Select Category',
        image: null, // new image optional
        imageUrl: book.image ? `${import.meta.env.VITE_BACKEND_URL}/${book.image}` : ''
      });
    }
  }, [isEdit, state]);

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
    if (!formData.title || !formData.author || !formData.Publisher || !formData.price || !formData.originalPrice || !formData.discount) {
      alert("Please fill all fields");
      return;
    }

    try {
      const data = new FormData();
      if (isEdit) data.append('_id', state.book._id); // include id for update
      data.append('title', formData.title);
      data.append('author', formData.author);
      data.append('Publisher', formData.Publisher);
      data.append('price', formData.price);
      data.append('originalPrice', formData.originalPrice);
      data.append('discount', formData.discount);
      data.append('category', formData.category);
      if (formData.image) data.append('image', formData.image); // optional

      await ImagesApiPost(data);
      alert(isEdit ? "Book updated successfully!" : "Book saved successfully!");
      navigate('/');
    } catch (error) {
      alert("Failed to save book.");
      console.error(error);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start pt-10 z-50 overflow-y-auto'>
      <div className='bg-white w-[90%] max-w-4xl rounded shadow-lg p-6 relative'>
        <button onClick={() => navigate('/')} className='absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl cursor-pointer'>✕</button>
        <h2 className='text-xl font-bold mb-4 text-center'>{isEdit ? "Edit Book" : "Add New Book"}</h2>

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
            name="Publisher" 
            value={formData.Publisher} 
            onChange={handleFormChange} 
            placeholder="Publisher" 
            className="border p-2 rounded w-full" 
          />

          <input 
            name="price" 
            value={formData.price}
            onChange={handleFormChange} 
            placeholder="Price" 
            className="border p-2 rounded w-full" 
          />

          <input 
            name="originalPrice" 
            value={formData.originalPrice} 
            onChange={handleFormChange} 
            placeholder="Original Price" 
            className="border p-2 rounded w-full" 
          />

          <input 
            name="discount" 
            value={formData.discount} 
            onChange={handleFormChange} 
            placeholder="Discount" 
            className="border p-2 rounded w-full" 
          />

          {/* Category disabled on edit */}
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleFormChange} 
            className="border p-2 rounded w-full" 
            disabled={isEdit}
          >
            {Category.map((cat) => (
              <option 
                key={cat} 
              >
                {cat}
              </option>
            ))}                      
          </select>

          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            onChange={handleFormChange} 
            className="border p-2 rounded w-full cursor-pointer" 
          />
        </div>

        <div className='text-center flex justify-center gap-5'>
          <button 
            onClick={() => navigate('/')} 
            className='bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 cursor-pointer'
          >
            Cancel
          </button>
          <button 
            onClick={handleSaveToServer} 
            className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer'
          >
            {isEdit ? "Update Book" : "Save Book"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBooks;
