'use client'
import { login, register } from '@/ReduxToolkit/LoginSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaGreaterThan } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useNavigation } from 'react-router';
import { toast } from 'react-toastify';

export default function Login() {
    const router = useRouter()

    const dispatach = useDispatch();
    const [loginProcessing, setLoginProcessing] = useState(false);
    const [registerProcessing, setRegisterProcessing] = useState(false);

    const loginHandler = (e) => {
        e.preventDefault();
        setLoginProcessing(true)
        
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/login`, e.target)
        .then((result) => {
            if(result.data._status == true){
                dispatach(login(result.data._token));
                toast.success(result.data._message)
                router.push('/my-dashboard');
            } else {
                toast.error(result.data._message)
            }
            setLoginProcessing(false)
        })
        .catch(() => {
            setLoginProcessing(false)
            toast.error('Something went wrong !')
        })
    }

    const registerHandler = (e) => {
        e.preventDefault();
        setRegisterProcessing(true)
        
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/register`, e.target)
        .then((result) => {
            if(result.data._status == true){
                dispatach(register(result.data._token));
                toast.success(result.data._message)
                router.push('/my-dashboard');
            } else {
                toast.error(result.data._message)
            }
            setRegisterProcessing(false)
        })
        .catch(() => {
            setRegisterProcessing(false)
            toast.error('Something went wrong !')
        })
    }

    return (
        <>
            <div>
                <div className='text-center mt-5 p-10 border-t-1 border-gray-200'>
                    <p className='text-4xl font-medium'>My Account</p>
                    <div className='flex justify-center pt-3 items-center gap-2'>
                        <p className='hover:text-yellow-600'>Home</p>
                        <FaGreaterThan size={10} className='mt-1' />
                        <p className='text-yellow-600'>My Account</p>
                    </div>
                </div>

                <p className='mt-2 mr-30 border-t-1 border-gray-200 ml-20'></p>

                <div className="flex  px-6 py-16 border-b-1 border-gray-200">
                    <div className="w-full ml-20 mr-20 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl text-gray-900 mb-6">Login</h2>
                            <form onSubmit={ loginHandler }>
                                <div className="bg-white border border-gray-200 p-8">
                                    <div className="mb-5">
                                        <label className="block text-md hover:text-[#b5845a]  mb-1">Email</label>
                                        <input type="email" name='email' placeholder="Email Address" className="w-full border border-gray-300 px-4 py-2.5 text-sm text-gray-500" />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block  hover:text-[#b5845a] text-md mb-1">Password</label>
                                        <input type="password" name='password' placeholder="Password" className="w-full border border-gray-300 px-4 py-2.5 text-sm text-gray-500 placeholder-gray-400" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <a href="#" className="text-sm text-[#b5845a]">Lost your password?</a>
                                        <button className="bg-[#b5845a] hover:bg-[black] text-white text-sm font-medium  px-6 py-2.5 rounded-full" disabled={ loginProcessing ? 'disabled' : '' }>
                                            { loginProcessing ? 'Loading....' : 'LOGIN' }
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div>
                            <h2 className="text-3xl text-gray-900 mb-6">Register</h2>
                            <form onSubmit={ registerHandler }>
                            <div className="bg-white border border-gray-200 p-8">
                                <div className="mb-5">
                                    <label className="block  hover:text-[#b5845a] text-md mb-1">Name</label>
                                    <input type="text" name='name' placeholder="Name" className="w-full border border-gray-300 px-4 py-2.5 text-sm text-gray-500" />
                                </div>
                                <div className="mb-5">
                                    <label className="block  hover:text-[#b5845a] text-md mb-1">Email Address</label>
                                    <input type="email" name='email' placeholder="Email Address" className="w-full border border-gray-300 px-4 py-2.5 text-sm text-gray-500" />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-md hover:text-[#b5845a] text-gray-700 mb-1">Password</label>
                                    <input type="password" name='password' placeholder="Password" className="w-full border border-gray-300 px-4 py-2.5 text-sm text-gray-500 placeholder-gray-400" />
                                </div>
                                <div className="flex justify-end">
                                    <button className="bg-[#b5845a] hover:bg-[black] text-white text-sm font-medium  px-6 py-2.5 rounded-full" disabled={ registerProcessing ? 'disabled' : '' }>
                                        { registerProcessing ? 'Loading....' : 'REGISTER' } 
                                    </button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
