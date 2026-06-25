import React from 'react'
import { FaGreaterThan } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaPhoneAlt } from "react-icons/fa";
import { GoMail } from "react-icons/go";

export default function ContactUs() {
    return (
        <>
            <div>
                <div className='text-center mt-5 p-10 border-t border-gray-200'>
                    <p className='text-4xl font-medium'>Contact Us</p>

                    <div className='flex justify-center pt-3 items-center gap-2'>
                        <p className='hover:text-yellow-600 cursor-pointer'>
                            Home
                        </p>

                        <FaGreaterThan size={10} className='mt-1' />
                        <p className='text-yellow-600'>
                            Contact Us
                        </p>
                    </div>
                </div>

                <div className='px-5 border-t-1 border-gray-200 md:px-20'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.6255114907312!2d73.0306057!3d26.2738149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c5b1dfafdd7%3A0xf992fd41c21a238e!2sLaxmi%20Dairy%20%26%20Provision%20Store!5e0!3m2!1sen!2sin!4v1779447148859!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen=""
                        className='rounded-lg mt-10 shadow-md'
                        title="Google Map"
                    >
                    </iframe>
                </div>

                <div className="py-20 border-b border-gray-300 px-6 ml-5 md:px-16">
                    <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div>
                            <h2 className="text-xl font-bold text-[#2b2b2b] mb-5">
                                Contact Us
                            </h2>

                            <div className="border-t border-gray-300 py-3 flex items-center gap-3">
                                <div className="text-xl text-gray-600">
                                    <HiOutlineBuildingOffice2 />
                                </div>
                                <p className="text-gray-700 text-md">
                                    Address : Claritas est etiam processus dynamicus
                                </p>
                            </div>

                            <div className="border-t border-gray-300 py-3 flex items-center gap-3">
                                <div className="text-md text-gray-600">
                                    <FaPhoneAlt />
                                </div>
                                <p className="text-gray-700 text-md">
                                    98745612330
                                </p>
                            </div>

                            <div className="border-t border-gray-300 py-3 flex items-center gap-3">
                                <div className="text-md text-gray-600">
                                    <GoMail />
                                </div>
                                <p className="text-gray-700 text-md">
                                    furniture@gmail.com
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-[#2b2b2b] mb-10">
                                Tell Us Your Question
                            </h2>

                            <form className="space-y-8">
                                <div>
                                    <label className="block text-md font-semibold text-[#2b2b2b] mb-2">
                                        Your Name (required)
                                    </label>

                                    <input type="text" placeholder="Name *" className="w-full border border-gray-300 px-5 py-2 outline-none focus:border-black bg-white"/>
                                </div>
                                <div>
                                    <label className="block text-md font-semibold text-[#2b2b2b] mb-2">
                                        Your Email (required)
                                    </label>

                                    <input type="email" placeholder="Email *" className="w-full border border-gray-300 px-5 py-2 outline-none focus:border-black bg-white"/>
                                </div>
                                <div>
                                    <label className="block text-md font-semibold text-[#2b2b2b] mb-2">
                                        Your Mobile Number (required)
                                    </label>

                                    <input type="text" placeholder="Mobile Number *" className="w-full border border-gray-300 px-5 py-2 outline-none focus:border-black bg-white"/>
                                </div>
                                <div>
                                    <label className="block text-md font-semibold text-[#2b2b2b] mb-2">
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Subject *"
                                        className="w-full border border-gray-300 px-5 py-2 outline-none focus:border-black bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-md font-semibold text-[#2b2b2b] mb-2">
                                        Your Message
                                    </label>

                                    <textarea rows="6" placeholder="Message *" className="w-full border border-gray-300 px-5 py-2 outline-none focus:border-black bg-white resize-none"/>
                                </div>
                                <button className="bg-black text-white px-5 py-2 text-md hover:bg-gray-800 transition-all duration-300">
                                    Send
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}