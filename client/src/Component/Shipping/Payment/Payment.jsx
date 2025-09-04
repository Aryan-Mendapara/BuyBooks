import React from 'react'
import Logo from '../../../assets/img/logo.png'
import { IoIosArrowBack } from "react-icons/io";
import { MdGTranslate } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();

    // 👇 Receive grandTotal from OrderSummary
    const grandTotal = location.state?.grandTotal ?? 0;

    return (
        <div className='bg-gray-50 py-5'>
            <div className='flex justify-center'>
                <div className='bg-white px-6 py-6 rounded-lg shadow-md w-[400px]'>                   
                    {/* Logo and Header */}
                    <div className='flex justify-center gap-5'>
                        <img src={Logo} alt="Logo" className='w-24' />
                        <h1 className='font-bold mt-3 text-lg text-gray-700'>Buybooksindia</h1>
                    </div>

                    {/* Total Price */}
                    <div className='mt-5 flex justify-between items-center pt-4'>
                        <h1 className='text-gray-900 text-lg font-medium'>Payable Now</h1>
                        <h1 className='text-xl font-semibold text-green-700'>
                            ₹ {grandTotal}
                        </h1>
                    </div>

                    <h1 className='text-sm mt-2 text-gray-900'>OFFERS</h1>

                    <div className='mt-5 border-t text-gray-500 border-gray-500'>
                        <h1>Secure Checkout</h1>
                        <h1 className='text-sm mt-1'>Transaction Id: 608468997436043</h1>
                    </div>
                </div>

                {/* Back + Profile */}
                <div className='bg-gray-100 px-3 py-3 w-90 rounded-lg shadow-md'>
                    <div className='flex gap-5 items-center'>
                        <h1
                            className='font-semibold flex items-center cursor-pointer'
                            onClick={() => navigate(-1)}
                        >
                            <IoIosArrowBack className='mr-1' size={25} />
                            <span className='text-xl'>Back</span>
                        </h1>

                        <h1 className='ml-auto text-gray-500'>
                            <MdGTranslate size={20} />
                        </h1>
                    </div>
                    <div>
                        <h1 className='border-t mt-4 border-gray-300 text-gray-600 text-sm'>PREFERRED PAYMENT OPTIONS</h1>
                    </div>
                </div>
            </div>

            <div className='flex justify-center mt-2'>
                <p className='w-[35rem] text-sm text-gray-500'>
                    I consent to PayU Group, their Business Partners and their service providers processing my data to offer relevant product and services. Manage your preference here.
                </p>
            </div>
        </div>
    )
}

export default Payment
