import React from 'react';

const WishList = () => {
    const wishlistHeaders = [
        "Product",
        "Description",
        "Availability",
        "Action"
    ];

    return (
        <div className='bg-white px-2 py-8'>
            {/* Title */}
            <div className='max-w-6xl mx-auto '>
                <h1 className='text-3xl'>WishList Summary</h1>
            </div>

            {/* Table Header */}
            <div className='max-w-6xl mx-auto mt-5 border border-gray-300'>
                <div className='grid grid-cols-4 bg-orange-500 text-white p-2 font-semibold text-sm text-center'>
                    {wishlistHeaders.map((header, index) => (
                        <div key={index}>{header}</div>
                    ))}
                </div>

                <div className="text-center p-4 text-lg">
                    No Record Found
                </div>
            </div>
        </div>
    );
};

export default WishList;
