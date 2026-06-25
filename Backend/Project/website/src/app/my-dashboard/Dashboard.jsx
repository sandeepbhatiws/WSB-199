"use client";
import React, { useState } from 'react'
import { FaGreaterThan } from "react-icons/fa6";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { logout } from '@/ReduxToolkit/LoginSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie'

export default function Dashboard() {

    const [activeTab, setActiveTab] = useState("dashboard");

    const dispatch = useDispatch();

    const router = useRouter();

    // useEffect(() => {
    //     if (activeTab === "logout") {
    //         router.push("/");
    //     }
    // }, [activeTab]);

    const logoutUser = () => {
        dispatch(logout());
        toast.success('Logout Succussfully.')
        router.push("/");
    }

    const renderContent = (userProfile) => {

        console.log(userProfile)

        switch (activeTab) {
            case "dashboard":
                return (
                    <>
                        <h2 className="text-xl font-bold mb-4">My Dashboard</h2>
                        <p className="text-[#5A5A5A] text-sm font-semibold leading-8">
                            From your account dashboard, you can easily check &
                            view your recent orders, manage your shipping and
                            billing addresses and <span className='text-[#C09578]'>Edit your password and account
                                details.</span>
                        </p>
                    </>
                );

            case "orders":
                return (
                    <>
                        <h2 className="text-xl font-bold mb-4">Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-center">
                                <thead>
                                    <tr className="border-b border-black bg-[#F2F2F2]">
                                        <th className="py-4 text-md font-semibold">Order</th>
                                        <th className="py-4 text-md font-semibold">Date</th>
                                        <th className="py-4 text-md font-semibold">Status</th>
                                        <th className="py-4 text-md font-semibold">Total</th>
                                        <th className="py-4 text-md font-semibold">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="border-b border-gray-300">
                                        <td className="py-4 border-x border-gray-200 text-sm font-bold">1</td>
                                        <td className="py-4 border-x border-gray-200 text-sm font-bold">May 10, 2018</td>
                                        <td className="py-4 border-x border-gray-200 text-sm font-bold">Completed</td>
                                        <td className="py-4 border-x border-gray-200 text-sm font-bold">
                                            Rs. 25.00 For 1 Item
                                        </td>
                                        <td className="py-4 border-r border-gray-200">
                                            <button className="text-[#c39a7a] font-bold hover:underline">
                                                View
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-4 border-x border-y border-gray-200 text-sm font-bold">2</td>
                                        <td className="py-4 border-x border-y border-gray-200 text-sm font-bold">May 10, 2018</td>
                                        <td className="py-4 border-x border-y border-gray-200 text-sm font-bold">Processing</td>
                                        <td className="py-4 border-x border-y border-gray-200 text-sm font-bold">
                                            Rs. 17.00 For 1 Item
                                        </td>
                                        <td className="py-4 border-r border-y border-gray-200">
                                            <button className="text-[#c39a7a] font-bold hover:underline">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                );

            case "addresses":
                return (
                    <>
                        <div>
                            <p className="text-gray-600 mb-8">
                                The following addresses will be used on the checkout page by default.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="text-xl mb-3">
                                        Billing Address
                                    </h2>

                                    <div className="border border-gray-300 rounded p-6">
                                        <div className="space-y-5">
                                            <div>
                                                <label className="block mb-2">
                                                    Billing Name*
                                                </label>
                                                <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    Billing Email*
                                                </label>
                                                <input type="email" className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    Billing Mobile Number*
                                                </label>
                                                <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    Billing Address*
                                                </label>
                                                <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    Country*
                                                </label>

                                                <select className="w-full border border-gray-300 rounded px-4 py-2 outline-none">
                                                    <option>Select Country</option>
                                                    <option>India</option>
                                                    <option>USA</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    State*
                                                </label>
                                                <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    City*
                                                </label>
                                                <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                            </div>

                                            <div className="flex justify-end pt-2">
                                                <button className="bg-[#c39a7a] text-white px-5 py-1 rounded-full font-bold text-sm hover:bg-[black]">
                                                    UPDATE
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl mb-3">
                                        Shipping Address
                                    </h2>

                                    <div className="border border-gray-300 rounded p-6">
                                        <div className="space-y-5">

                                            <div>
                                                <label className="block mb-2">
                                                    Shipping Name*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    Shipping Email*
                                                </label>
                                                <input
                                                    type="email"
                                                    className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    Shipping Mobile Number*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    Shipping Address*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    Country*
                                                </label>

                                                <select className="w-full border border-gray-300 rounded px-4 py-2 outline-none">
                                                    <option>Select Country</option>
                                                    <option>India</option>
                                                    <option>USA</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    State*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-2">
                                                    City*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                                                />
                                            </div>

                                            <div className="flex justify-end pt-2">
                                                <button className="bg-[#c39a7a] text-white px-5 py-1 rounded-full font-bold text-sm hover:bg-[black]">
                                                    UPDATE
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                );

            case "profile":
                return (
                    <>
                        <h2 className="text-2xl font-semibold mb-6">
                            My Profile
                        </h2>
                        <div className="border border-gray-300 rounded p-6 min-h-[600px]">
                            <div className="flex items-center gap-6 mb-8">
                                <label className="flex items-center text-sm gap-2 font-bold">
                                    <input type="radio" name="gender" defaultChecked
                                        className="w-5 h-5" />
                                    Mr.
                                </label>

                                <label className="flex items-center text-sm gap-2 font-bold">
                                    <input type="radio" name="gender" className="w-5 h-5" />
                                    Mrs.
                                </label>
                            </div>

                            <div className="space-y-8">

                                <div>
                                    <label className="block text-md mb-3">
                                        Name*
                                    </label>

                                    <input type="text" name='name' defaultValue={userProfile.name} className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-md mb-3">
                                        Email*
                                    </label>

                                    <input type="email" className="w-full border border-gray-300 bg-gray-100 rounded px-4 py-2 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-md mb-3">
                                        Mobile Number*
                                    </label>

                                    <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                </div>

                                <div>
                                    <label className="block text-md mb-3">
                                        Address*
                                    </label>

                                    <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                </div>

                                <div className="flex justify-end pt-8">
                                    <button className="bg-[#c39a7a] text-sm font-bold text-white px-5  py-2 rounded-full hover:bg-black cursor-pointer">
                                        UPDATE
                                    </button>
                                </div>

                            </div>
                        </div>
                    </>
                );

            case "password":
                return (
                    <>
                        <h2 className="text-2xl font-semibold mb-6">
                            Change Password
                        </h2>
                        <div className="border border-gray-300 rounded p-6 min-h-[350px]">

                            <div>
                                <label className="block text-md mb-1">
                                    Current Password
                                </label>

                                <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 outline-none mb-4" />
                            </div>
                            <div>
                                <label className="block text-md mb-1">
                                    New Password
                                </label>

                                <input type="email" className="w-full border border-gray-300 rounded px-4 py-2 outline-none mb-4" />
                            </div>
                            <div>
                                <label className="block text-md mb-1">
                                    Confirm Password
                                </label>

                                <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 outline-none mb-4" />
                            </div>

                            <div className="flex justify-end pt-8">
                                <button className="bg-[#c39a7a] text-[12px] font-bold text-white px-4  py-2 rounded-full hover:bg-black cursor-pointer">
                                    CHANGE PASSWORD
                                </button>
                            </div>

                        </div>
                    </>
                );

            case "logout":
                return (
                    <></>
                );

            default:
                return null;
        }
    };

    const menuItems = [
        { id: "dashboard", label: "My Dashboard" },
        { id: "orders", label: "Orders" },
        { id: "addresses", label: "Addresses" },
        { id: "profile", label: "My Profile" },
        { id: "password", label: "Change Password" },
        { id: "logout", label: "Logout" },
    ];

    const [userProfile, setUserProfile] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/view-profile`, {}, {
            headers: {
                Authorization: `Bearer ${Cookies.get('user_login')}`
            }
        })
            .then((result) => {
                if (result.data._status) {
                    setUserProfile(result.data._data)
                    setGender(result.data._data.gender)
                } else {
                    setUserProfile('')
                }
            })
            .catch(() => {
                toast.error('Something went wrong.')
            })
    }, []);

    const updateProfile = (e) => {
        e.preventDefault();

        axios.put(`${process.env.NEXT_PUBLIC_API_URL}user/update-profile`, e.target, {
            headers: {
                Authorization: `Bearer ${Cookies.get('user_login')}`
            }
        })
            .then((result) => {
                if (result.data._status) {
                    toast.success(result.data._message)
                } else {
                    toast.error(result.data._message)
                }
            })
            .catch(() => {
                toast.error('Something went wrong.')
            })
    }

    const changePassword = (e) => {
        e.preventDefault();

        axios.put(`${process.env.NEXT_PUBLIC_API_URL}user/change-password`, e.target, {
            headers: {
                Authorization: `Bearer ${Cookies.get('user_login')}`
            }
        })
            .then((result) => {
                if (result.data._status) {
                    toast.success(result.data._message)
                    e.target.reset();
                } else {
                    toast.error(result.data._message)
                }
            })
            .catch(() => {
                toast.error('Something went wrong.')
            })
    }

    return (
        <>
            <div>
                <div className='text-center mt-5 p-10 border-t border-gray-200'>
                    <p className='text-4xl font-medium'>My Dashboard</p>

                    <div className='flex justify-center pt-3 items-center gap-2'>
                        <p className='hover:text-yellow-600 cursor-pointer'>
                            Home
                        </p>

                        <FaGreaterThan size={10} className='mt-1' />

                        <p className='text-yellow-600'>
                            My Dashboard
                        </p>
                    </div>
                </div>
                <div className='mt-2 mr-30 border-t-1 border-gray-200 ml-20'></div>
                <div className='max-w-7xl mx-auto pr-4 ml-20 py-10'>
                    <div className='grid md:grid-cols-[320px_1fr] gap-8'>
                        <div className='space-y-2'>
                            {menuItems.map((item) => (

                                item.id == 'logout'
                                    ?
                                    <button key={item.id} onClick={() => logoutUser()} className={`w-full text-left px-3 py-3 rounded-md font-bold transition-all cursor-pointer duration-300 text-sm bg-[#1d1d1d] text-white hover:bg-black`}
                                    >
                                        {item.label}
                                    </button>
                                    :
                                    <button key={item.id} onClick={() => setActiveTab(item.id)}
                                        className={`w-full text-left px-3 py-3 rounded-md font-bold transition-all cursor-pointer duration-300 text-sm
                                    
                                    ${activeTab === item.id
                                                ?
                                                "bg-[#c39a7a] text-white"
                                                :
                                                "bg-[#1d1d1d] text-white hover:bg-black"
                                            }
                                    `}
                                    >
                                        {item.label}
                                    </button>


                            ))}
                        </div>
                        <div className='min-h-[450px] bg-white'>
                            {/* {renderContent(userProfile)} */}

                            {
                                activeTab == 'dashboard'
                                    ?
                                    <>
                                        <h2 className="text-xl font-bold mb-4">My Dashboard</h2>
                                        <p className="text-[#5A5A5A] text-sm font-semibold leading-8">
                                            From your account dashboard, you can easily check &
                                            view your recent orders, manage your shipping and
                                            billing addresses and <span className='text-[#C09578]'>Edit your password and account
                                                details.</span>
                                        </p>
                                    </>
                                    :
                                    ''
                            }

                            {
                                activeTab == 'profile'
                                    ?
                                    <>
                                        <h2 className="text-2xl font-semibold mb-6">
                                            My Profile
                                        </h2>
                                        <form onSubmit={updateProfile}>
                                            <div className="border border-gray-300 rounded p-6 min-h-[600px]">
                                                <div className="flex items-center gap-6 mb-8">
                                                    <label className="flex items-center text-sm gap-2 font-bold">
                                                        <input type="radio" name="gender" value={'Male'}
                                                            onClick={() => setGender('Male')}
                                                            className="w-5 h-5" checked={gender == 'Male' ? 'checked' : ''} />
                                                        Male
                                                    </label>

                                                    <label className="flex items-center text-sm gap-2 font-bold">
                                                        <input type="radio" name="gender" value={'Female'}
                                                            onClick={() => setGender('Female')}
                                                            className="w-5 h-5" checked={gender == 'Female' ? 'checked' : ''} />
                                                        Female
                                                    </label>
                                                </div>

                                                <div className="space-y-8">

                                                    <div>
                                                        <label className="block text-md mb-3">
                                                            Name*
                                                        </label>

                                                        <input type="text" name='name' defaultValue={userProfile.name} className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-md mb-3">
                                                            Email*
                                                        </label>

                                                        <input type="email" value={userProfile.email} className="w-full border border-gray-300 bg-gray-100 rounded px-4 py-2 outline-none" disabled />
                                                    </div>
                                                    <div>
                                                        <label className="block text-md mb-3">
                                                            Mobile Number*
                                                        </label>

                                                        <input type="text" name='mobile_number' defaultValue={userProfile.mobile_number} className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                                    </div>

                                                    <div>
                                                        <label className="block text-md mb-3">
                                                            Address*
                                                        </label>

                                                        <input type="text" name='address' defaultValue={userProfile.address} className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                                                    </div>

                                                    <div className="flex justify-end pt-8">
                                                        <button className="bg-[#c39a7a] text-sm font-bold text-white px-5  py-2 rounded-full hover:bg-black cursor-pointer">
                                                            UPDATE
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </form>
                                    </>
                                    :
                                    ''
                            }

                            {
                                activeTab == 'password'
                                    ?
                                    <>
                                        <h2 className="text-2xl font-semibold mb-6">
                                            Change Password
                                        </h2>
                                        <div className="border border-gray-300 rounded p-6 min-h-[350px]">
                                            <form onSubmit={ changePassword }>
                                            <div>
                                                <label className="block text-md mb-1">
                                                    Current Password
                                                </label>

                                                <input type="text" name='current_password' className="w-full border border-gray-300 rounded px-4 py-2 outline-none mb-4" />
                                            </div>
                                            <div>
                                                <label className="block text-md mb-1">
                                                    New Password
                                                </label>

                                                <input type="text" name='new_password' className="w-full border border-gray-300 rounded px-4 py-2 outline-none mb-4" />
                                            </div>
                                            <div>
                                                <label className="block text-md mb-1">
                                                    Confirm Password
                                                </label>

                                                <input type="text" name='confirm_password' className="w-full border border-gray-300 rounded px-4 py-2 outline-none mb-4" />
                                            </div>

                                            <div className="flex justify-end pt-8">
                                                <button className="bg-[#c39a7a] text-[12px] font-bold text-white px-4  py-2 rounded-full hover:bg-black cursor-pointer">
                                                    CHANGE PASSWORD
                                                </button>
                                            </div>
                                            </form>

                                        </div>
                                    </>
                                    :
                                    ''
                            }
                        </div>

                    </div>
                </div>
                <div className='mt-2 border-b-1 border-gray-200'></div>
            </div>
        </>
    )
}