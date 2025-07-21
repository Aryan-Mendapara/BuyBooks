import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImagesApiGet } from '../ApiServer/NewArrivalImgApi';

const AddToCart = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            const data = await ImagesApiGet();
            const foundBook = data.books?.find(b => b._id === id);
            setBook(foundBook);
        };
        fetchBook();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div className="px-20 mt-20 flex gap-10">
            <div className='border border-gray-400 p-5'>
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${book.image}`}
                    alt={book.title}
                    className="h-100 w-100 object-contain"
                />
            </div>
            <div className='flex justify-center'>
                <div>
                    <h2 className="text-2xl font-bold mb-1 w-full">{book.title}</h2>
                    <p className="text-black/80 mb-1"><span className='text-black/80 font-bold'>Author :</span>{book.author}</p>
                    <p className="text-black/80 mb-1"><span className='text-black/80 font-bold'>Publisher :</span>{book.Publisher}</p>
                    <p className="text-orange-500 text-2xl font-semibold">
                        ₹{book.price}
                        <span className='text-xl text-gray-500 line-through mx-2'>₹{book.originalPrice}</span>
                    </p>
                    <p className='border'>{book.discount}% OFF</p>
                    <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded">
                        Add to Cart
                    </button>
                </div>
            </div>

        </div>
    );
}

export default AddToCart;
