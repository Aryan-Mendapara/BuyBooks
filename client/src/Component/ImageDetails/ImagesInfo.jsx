import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ImagesApiGet } from '../ApiServer/NewArrivalImgApi';

const AddToCart = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            const data = await ImagesApiGet();
            const foundBook = data.books?.find(b => b._id === id);
            setBook(foundBook);
        };
        fetchBook();
    }, [id]);

    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        localStorage.setItem("cart", JSON.stringify([...existingCart, book]));

        navigate('/billing-details');
    }

    if (!book) return <div className="mt-20 text-center text-gray-600">Loading...</div>;

    return (
        <div className="px-6 md:px-20 mt-20 flex flex-col md:flex-row gap-10">
            <div className='border border-gray-400 p-5 flex-shrink-0'>
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${book.image}`}
                    alt={book.title}
                    className="h-80 w-80 object-contain"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.jpg";
                    }}
                />
            </div>
            <div className='flex justify-center'>
                <div>
                    <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                    <p className="text-black/80 mb-2"><span className='font-bold'>Author :</span> {book.author}</p>
                    <p className="text-black/80 mb-2"><span className='font-bold'>Publisher :</span> {book.Publisher}</p>

                    <div className='flex gap-2 items-center mb-2'>
                        <p className="text-orange-500 text-2xl font-semibold">
                            ₹{book.price}
                            <span className='text-xl text-gray-500 line-through mx-2'>₹{book.originalPrice}</span>
                        </p>
                        <p className='bg-yellow-500 text-white px-2 py-1 text-sm rounded'>
                            {book.discount}% OFF
                        </p>
                    </div>

                    <p className="mb-2"> <span className='font-bold'>Availability : </span> Available</p>

                    <button
                        onClick={() => handleAddToCart()}
                        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer"
                    >
                        Add to Cart
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AddToCart;
