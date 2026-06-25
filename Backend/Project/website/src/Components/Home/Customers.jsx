import React from 'react'
import { LiaGlobeSolid } from "react-icons/lia";
import { SiTicktick } from "react-icons/si";
import { IoMdTime } from "react-icons/io";
import { FaStar } from "react-icons/fa";

export default function Customers() {
    return (
        <>
            <div className=' flex bg-neutral-200 py-20'>
                <div className='flex justify-center m-auto'>
                    <div className=" items-center text-center p-5">
                        <div className="w-15 h-15 flex items-center justify-center rounded-full border ml-13 mb-2">
                            <LiaGlobeSolid size={30} />
                        </div>
                        <p>
                            <div className='text-xl font-medium'>Free Shipping </div>
                            <div className='text-sm'>Free shipping on all order</div>
                        </p>
                    </div>
                    <div className=" items-center text-center  p-5">
                        <div className="w-15 h-15 flex items-center justify-center rounded-full border ml-13 mb-2">
                            <SiTicktick size={30} />
                        </div>
                        <div>
                            <div className='text-xl font-medium'>Money Return</div>
                            <div className='text-sm'>Back guarantee under 7 days</div>
                        </div>
                    </div>
                    <div className=" items-center text-center  p-5">
                        <div className="w-15 h-15 flex items-center justify-center rounded-full border ml-13 mb-2">
                            <IoMdTime size={30} />
                        </div>
                        <p>
                            <div className='text-xl  font-medium'>Online Support</div>
                            <div className='text-sm'>Support online 24 hours a day</div>
                        </p>
                    </div>
                </div>
            </div>

            <div className='text-center p-10'>
                <h1 className='text-2xl font-bold pb-5'>What Our Custumers Say ?</h1>
                <p className='px-40'>These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!</p>
                <div>
                    <figure>
                        <img src='/why1.jpg' className="m-auto" />
                    </figure>
                    <p className='pt-2 font-bold text-sm'>KATHY YOUNG</p>
                    <p className='pt-2 text-sm'>CEO of SunPark</p>
                    <div>
                        <div className='flex justify-center pt-5'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-neutral-200 py-15'>
                <p className='text-xl font-medium text-center'>Our Newsletter</p>
                <p className='text-center pt-2 '>Get E-mail updates about our latest shop and special offers.</p>
                <div className='flex justify-center pt-5'>
                    <input type="email" placeholder="Enter Your Email" className="w-120 px-5 py-3 rounded-l-md outline-none border border-r-0 " />

                    <button className="bg-amber-600 font-medium text-white px-10 py-3 rounded-r-md hover:bg-olive-950 hover:text-white transition">
                        Subscribe
                    </button>
                </div>
            </div>
        </>
    )
}
