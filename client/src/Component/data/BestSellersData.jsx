import React, { useState } from 'react'
import { ImagesApiPost } from '../ApiServer/NewArrivalImgApi';
import { useNavigate } from 'react-router-dom';

function ImagesData() {
    // const[showPopup, setShowPopup] = useState(true);
    const [formData, setFormData] = useState({
    title: '',
    author: '',
    Publisher: '',
    price: '',
    originalPrice: '',
    discount: '',
    image: null,
    imageUrl: ''
  });

  const navigate = useNavigate();

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
    if (!formData.title || !formData.author || !formData.Publisher || !formData.price || !formData.originalPrice || !formData.discount || !formData.image) {
      alert("Please fill all fields");
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('author', formData.author);
      data.append('Publisher', formData.Publisher);
      data.append('price', formData.price);
      data.append('originalPrice', formData.originalPrice);
      data.append('discount', formData.discount);
      data.append('image', formData.image);

      await ImagesApiPost(data);
      alert("Book saved to server successfully!");
      navigate("/bestsellersimg");
    } catch (error) {
      alert("Failed to save book.");
    }
  };

    return (
        <div>
            <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start pt-10 z-50 overflow-y-auto'>
                <div className='bg-white w-[90%] max-w-4xl rounded shadow-lg p-6 relative'>
                    <button
                        onClick={() => navigate('/bestsellersimg')}
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
                            placeholder="price"
                            className="border p-2 rounded w-full"
                        />
                        <input
                            name="originalPrice"
                            value={formData.originalPrice}
                            onChange={handleFormChange}
                            placeholder="originalPrice"
                            className="border p-2 rounded w-full"
                        />
                        <input
                            name="discount"
                            value={formData.discount}
                            onChange={handleFormChange}
                            placeholder="discount"
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

                    <div className='text-center flex justify-center gap-5'>
                        <button
                            onClick={() => navigate('/bestsellersimg')} 
                            className='bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 cursor-pointer'
                        >
                            Cancle
                        </button>
                        <button 
                            onClick={handleSaveToServer} 
                            className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer'
                        >
                            Save Book
                        </button>                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagesData
