import React from 'react'
import { FaGreaterThan } from "react-icons/fa6";


export default function Cart() {
    return (
        <>
            <div>
                <div className='text-center mt-5 p-10 border-t-1 border-gray-200'>
                    <p className='text-4xl font-medium'>Shopping Cart</p>
                    <div className='flex justify-center pt-3 items-center gap-2'>
                        <p className='hover:text-yellow-600'>Home</p>
                        <FaGreaterThan size={10} className='mt-1' />
                        <p className='text-yellow-600'>Shopping Cart</p>
                    </div>
                </div>

                <figure className='mt-2 mr-30 border-t-1 border-gray-200 ml-20'>
                    <img src='/about-us/cart.jpg' className='mt-12 m-auto'/>
                </figure>

                <p className='text-center pb-10 text-sm text-gray-500 font-medium border-b-1 border-gray-200'>Your Shopping cart is empty!</p>
            </div>
        </>
    )
}
