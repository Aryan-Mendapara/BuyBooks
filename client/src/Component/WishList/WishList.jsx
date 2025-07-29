import React, { useEffect, useState } from 'react';
import { BillingApiGet } from '../ApiServer/BillingDetailsApi';

const WishList = () => {
    const wishlistHeaders = [
        "Product",
        "Description",
        "Availability",
        "Action"
    ];

    const [wishItems, setWishItems] = useState([]);

    useEffect(() => {
      const fetchBillingItems = async () => {
        try {
          const data = await BillingApiGet();
          console.log("✅ Billing data:", data);
          setWishItems(data);
        } catch (err) {
          console.error("❌ Error fetching billing items:", err);
        }
      };
    
      fetchBillingItems();
    }, []);

    return (
        <div className='bg-white px-2 py-8 flex flex-col items-center'>
            <div className='w-[90%] max-w-6xl text-left mb-4'>
                <h2 className='text-3xl'>WishList Summary</h2>
            </div>

            <table className='w-[90%] max-w-6xl border border-gray-300 text-sm'>
                <thead>
                    <tr className='bg-orange-500 text-white font-semibold text-center'>
                        {wishlistHeaders.map((header, index) => (
                            <th 
                                key={index} 
                                className="px-2 py-3 border border-gray-300"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                {wishItems.length > 0 ? (
                    wishItems.map((item, idx) => (
                        <tr
                            key={idx}
                            className="text-center text-sm border-t border-gray-300 items-center"
                        >
                            <td>
                                <img 
                                    src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
                                    alt={item.title}
                                    className="w-10 h-10 object-cover rounded-full"
                                />
                            </td>
                        </tr>
                    ))
                ):(
                    <tbody>
                    <tr>
                        <td colSpan={wishlistHeaders.length} className="text-center p-4 text-lg">
                            No Record Found
                        </td>
                    </tr>
                </tbody>
                )}                
            </table>
        </div>
    );
};

export default WishList;
