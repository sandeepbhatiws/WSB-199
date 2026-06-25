import React from 'react'
import { FaGreaterThan } from "react-icons/fa6";

export default function Reset() {
    return (
        <>
            <div>
                <div className='text-center mt-5 p-10 border-t-1 border-gray-200'>
                    <p className='text-4xl font-medium'>Reset Password</p>
                    <div className='flex justify-center pt-3 items-center gap-2'>
                        <p className='hover:text-yellow-600'>Home</p>
                        <FaGreaterThan size={10} className='mt-1' />
                        <p className='text-yellow-600'>Reset Password</p>
                    </div>
                </div>

                <p className='mt-2 mr-30 border-t-1 border-gray-200 ml-20'></p>

                <div className="flex  px-6 py-16 border-b-1 border-gray-200">
                    <div className="w-full ml-20 mr-20 grid grid-cols-1 md:grid-cols-1 gap-12">
                        <div>
                            <h2 className="text-3xl text-gray-900 mb-6">Reset Password</h2>
                            <div className="bg-white border border-gray-200 p-8">
                                <div className="mb-5">
                                    <label className="block text-md hover:text-[#b5845a]  mb-1">Current Password</label>
                                    <input type="password" placeholder="Email Address" className="w-full border border-gray-300 px-4 py-2.5 text-sm text-gray-500" />
                                </div>
                                <div className="mb-6">
                                    <label className="block  hover:text-[#b5845a] text-md mb-1">New Password</label>
                                    <input type="password" placeholder="Password" className="w-full border border-gray-300 px-4 py-2.5 text-sm text-gray-500 placeholder-gray-400" />
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* <a href="#" className="text-sm text-[#b5845a]">Lost your password?</a> */}
                                    <button className="bg-[#b5845a] hover:bg-[black] text-white text-sm font-medium  px-6 py-2.5 rounded-full">
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* <div>
                            <h2 className="text-3xl text-gray-900 mb-6">Register</h2>
                            <div className="bg-white border border-gray-200 p-8">
                                <div className="mb-5">
                                    <label className="block  hover:text-[#b5845a] text-md mb-1">Email Address</label>
                                    <input type="email" placeholder="Email Address" className="w-full border border-gray-300 px-4 py-2.5 text-sm text-gray-500" />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-md hover:text-[#b5845a] text-gray-700 mb-1">Password</label>
                                    <input type="password" placeholder="Password" className="w-full border border-gray-300 px-4 py-2.5 text-sm text-gray-500 placeholder-gray-400" />
                                </div>
                                <div className="flex justify-end">
                                    <button className="bg-[#b5845a] hover:bg-[black] text-white text-sm font-medium  px-6 py-2.5 rounded-full">
                                        REGISTER
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

            </div>
        </>
    )
}
