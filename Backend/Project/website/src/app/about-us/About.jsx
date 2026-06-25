import React from 'react'
import { FaGreaterThan } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";


export default function About() {
    return (
        <>
            <div>
                <div className='text-center mt-5 p-10 border-t-1 border-gray-200'>
                    <p className='text-4xl font-medium'>About Us</p>
                    <div className='flex justify-center pt-3 items-center gap-2'>
                        <p className='hover:text-yellow-600'>Home</p>
                        <FaGreaterThan size={10} className='mt-1' />
                        <p className='text-yellow-600'>About Us</p>
                    </div>
                </div>

                <figure className='mt-2 mr-30 border-t-1 border-gray-200 ml-20'>
                    <img src='/about-us/top.jpg' className='mt-12' />
                </figure>

                <div className='mt-3'>
                    <div className='text-center text-2xl font-bold'>Welcome To Monsta!</div>
                    <p className='text-center ml-20 mr-20'>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem.</p>
                    <p className='text-center ml-20 mr-20 text-yellow-600 mt-5'>“There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”</p>
                </div>

                <div className='mt-15'>
                    <div className='text-center text-2xl font-bold'>Why Choose Us?</div>
                    <div className='flex ml-20 mr-20 mt-5'>
                        <div>
                            <figure>
                                <img src='/about-us/home.jpg' className='m-auto' />
                            </figure>
                            <p className='text-center font-bold'>100% Money Back Guarantee</p>
                            <p className='text-center mt-2 text-sm text-zinc-600 ml-10'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                        </div>

                        <div>
                            <figure>
                                <img src='/about-us/support.jpg' className='m-auto' />
                            </figure>
                            <p className='text-center font-bold'>Online Support 24/7</p>
                            <p className='text-center mt-2 text-sm text-zinc-600 ml-10'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                        </div>

                        <div>
                            <figure>
                                <img src='/about-us/img2.jpg' className='m-auto' width={400} />
                            </figure>
                            <p className='text-center font-bold'>Creative-Design</p>
                            <p className='text-center mt-2 text-sm text-zinc-600 ml-10'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                        </div>

                    </div>
                </div>

                <div className='mt-15'>
                    <div className='flex ml-20 mr-20 mt-5'>
                        <div>
                            <figure>
                                <img src='/about-us/what.jpg' className='m-auto' />
                            </figure>
                            <p className='text-center font-medium mt-5 text-sm'>What Do We Do?</p>
                            <p className='text-center mt-2 text-zinc-600 ml-10'>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                        </div>

                        <div>
                            <figure>
                                <img src='/about-us/mission.jpg' className='m-auto' />
                            </figure>
                            <p className='text-center font-medium mt-5 text-sm'>Our Mission</p>
                            <p className='text-center mt-2 text-zinc-600 ml-10'>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                        </div>

                        <div>
                            <figure>
                                <img src='/about-us/history.jpg' className='m-auto' />
                            </figure>
                            <p className='text-center font-medium mt-5 text-sm'>History Of Us</p>
                            <p className='text-center mt-2 text-zinc-600 ml-10'>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                        </div>

                    </div>
                </div>

                <div className='text-center mt-5 p-10 border-b-1 border-gray-200'>
                    <h1 className='text-2xl font-medium pb-5'>What Our Custumers Say ?</h1>
                    <p className='px-40 font-medium text-zinc-600'>These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!</p>
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
            </div>
        </>
    )
}
