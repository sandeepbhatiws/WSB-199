'use client'
import products from '@/productData';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaGreaterThan } from "react-icons/fa6";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useRouter } from 'next/navigation';


export default function Checkout() {
    const { error, isLoading, Razorpay } = useRazorpay();

    const navigate = useRouter();

    const [showShipForm, setShowShipForm] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        var sum = 0;
        products.forEach((v) => {
            sum += v.qty * v.price;
        })
        setTotalAmount(sum);
    }, [])

    const [userProfile, setUserProfile] = useState('');
    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/view-profile`, {}, {
            headers: {
                Authorization: `Bearer ${Cookies.get('user_login')}`
            }
        })
            .then((result) => {
                if (result.data._status) {
                    setUserProfile(result.data._data)
                } else {
                    setUserProfile('')
                }
            })
            .catch(() => {
                toast.error('Something went wrong.')
            })
    }, []);

    const [orderLoading, setOrderLoading] = useState(false);

    const placeOrder = (event) => {
        event.preventDefault();
        setOrderLoading(true)

        var billing_address = {
            name: event.target.billing_name.value,
            email: event.target.billing_email.value,
            mobile_number: event.target.billing_mobile_number.value,
            address: event.target.billing_address.value,
            country: event.target.billing_country.value,
            state: event.target.billing_state.value,
            city: event.target.billing_city.value,
        }

        if (showShipForm) {
            var shipping_address = {
                name: event.target.shipping_name.value,
                email: event.target.shipping_email.value,
                mobile_number: event.target.shipping_mobile_number.value,
                address: event.target.shipping_address.value,
                country: event.target.shipping_country.value,
                state: event.target.shipping_state.value,
                city: event.target.shipping_city.value,
            }
        } else {
            var shipping_address = billing_address
        }

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}checkout/place-order`, {
            name: event.target.name.value,
            mobile_number: event.target.mobile_number.value,
            total_amount: totalAmount,
            discount_amount: 0,
            net_amount: totalAmount,
            order_note: event.target.order_notes.value,
            product_info: products,
            billing_address: billing_address,
            shipping_address: shipping_address,
        }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('user_login')}`
            }
        })
            .then((result) => {
                setOrderLoading(false)

                if (result.data._status) {
                    handlePayment(result.data._data)
                } else {
                    toast.error(result.data._message)
                }
            })
            .catch(() => {
                setOrderLoading(false)
                toast.error('Something went wrong !')
            })
    }

    const handlePayment = (orderInfo) => {
        const options = {
            key: "rzp_test_WAft3lA6ly3OBc",
            amount: orderInfo.net_amount*100, // Amount in paise
            currency: "INR",
            name: "WsCubeTech",
            description: "Test Transaction",
            order_id: orderInfo.order_id, // Generate order_id on server
            handler: (response) => {
                console.log(response);
                orderStatusChange(response.razorpay_payment_id, response.razorpay_order_id)
                // toast.success("Payment Successful!");
            },
            prefill: {
                name: userProfile.name,
                email: userProfile.email,
                contact: userProfile.mobile_number,
            },
            theme: {
                color: "#F37254",
            },
        };

        const razorpayInstance = new Razorpay(options);

        razorpayInstance.on("payment.failed", function (response) {
            // toast.error('Payment Failed !!')
            console.log(response);
            orderStatusChange(response.error.metadata.payment_id, response.error.metadata.order_id)
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
        });

        razorpayInstance.open();
    };

    const orderStatusChange = (payment_id, order_id) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}checkout/order-status`, {
            payment_id: payment_id,
            order_id: order_id,
        }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('user_login')}`
            }
        })
        .then((result) => {
            if (result.data._status) {
                if(result.data._payment_status){
                    toast.success(result.data._message)
                    navigate.push('/')
                } else {
                    toast.error(result.data._message)
                }
            } else {
                toast.error(result.data._message)
            }
        })
        .catch(() => {
            toast.error('Something went wrong !')
        })
    }

    return (
        <>
            <div>
                <div className='text-center mt-5 p-10 border-t-1 border-gray-200'>
                    <p className='text-4xl font-medium'>Checkout</p>
                    <div className='flex justify-center pt-3 items-center gap-2'>
                        <p className='hover:text-yellow-600'>Home</p>
                        <FaGreaterThan size={10} className='mt-1' />
                        <p className='text-yellow-600'>Checkout</p>
                    </div>
                </div>

                <form onSubmit={placeOrder}>
                    <div className='pt-5 font-bold mr-30 border-t-1 border-gray-200 ml-20 flex gap-15'>
                        <div>
                            <div className='text-md pr-120 text-md bg-black text-white p-2 '>BILLING DETAILS</div>
                            <div className="pt-4">
                                <div className="mb-5 flex gap-5">
                                    <div>
                                        <label className="block text-sm  mb-1">Name</label>
                                        <input type="text" name="name" defaultValue={userProfile.name} className="w-[300px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">Mobile Number</label>
                                        <input type="text" name='mobile_number' defaultValue={userProfile.mobile_number} className="w-[300px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                    </div>
                                </div>

                                <div className="mb-5 flex gap-5">
                                    <div>
                                        <label className="block text-sm  mb-1">Billing Name</label>
                                        <input type="text" name="billing_name" className="w-[300px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">Billing Email</label>
                                        <input type="text" name='billing_email' className="w-[300px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                    </div>
                                </div>

                                <div className="mb-5 flex gap-5">
                                    <div>
                                        <label className="block text-sm  mb-1">Billing Mobile Number</label>
                                        <input type="text" name="billing_mobile_number" className="w-[620px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                    </div>
                                </div>

                                <div className="mb-5 flex gap-5">
                                    <div>
                                        <label className="block text-sm  mb-1">Billing Address</label>
                                        <input type="text" name="billing_address" className="w-[620px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                    </div>
                                </div>

                                <div className="mb-5 flex gap-5">
                                    <div>
                                        <label className="block text-sm  mb-1">Country</label>
                                        <select type="text" name="billing_country" className="w-[620px] border border-gray-300 px-4 py-2 text-sm text-gray-500">
                                            <option>Select Country</option>
                                            <option>India</option>
                                            <option>India</option>
                                            <option>India</option>
                                            <option>India</option>
                                            <option>India</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-5 flex gap-5">
                                    <div>
                                        <label className="block text-sm  mb-1">State</label>
                                        <input type="text" name="billing_state" className="w-[300px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">City</label>
                                        <input type="text" name='billing_city' className="w-[300px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <input type="checkbox" checked={showShipForm} onChange={() => setShowShipForm(!showShipForm)} />

                                    <button type="button" onClick={() => setShowShipForm(!showShipForm)} className="bg-gray-900 text-white px-4 py-2 font-bold">
                                        Ship To A Different Address?
                                    </button>
                                </div>

                                {showShipForm && (
                                    <div>
                                        <div className="mb-5 flex gap-5">
                                            <div>
                                                <label className="block text-sm  mb-1">Shipping Name</label>
                                                <input type="text" name="shipping_name" className="w-[300px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm mb-1">Shipping Email</label>
                                                <input type="text" name='shipping_email' className="w-[300px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                            </div>
                                        </div>

                                        <div className="mb-5 flex gap-5">
                                            <div>
                                                <label className="block text-sm  mb-1">Shipping Mobile Number</label>
                                                <input type="text" name="shipping_mobile_number" className="w-[620px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                            </div>
                                        </div>

                                        <div className="mb-5 flex gap-5">
                                            <div>
                                                <label className="block text-sm  mb-1">Shipping Address</label>
                                                <input type="text" name="shipping_address" className="w-[620px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                            </div>
                                        </div>

                                        <div className="mb-5 flex gap-5">
                                            <div>
                                                <label className="block text-sm  mb-1">Country</label>
                                                <select type="text" name="shipping_country" className="w-[620px] border border-gray-300 px-4 py-2 text-sm text-gray-500">
                                                    <option>Select Country</option>
                                                    <option>India</option>
                                                    <option>India</option>
                                                    <option>India</option>
                                                    <option>India</option>
                                                    <option>India</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mb-5 flex gap-5">
                                            <div>
                                                <label className="block text-sm  mb-1">State</label>
                                                <input type="text" name="shipping_state" className="w-[300px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm mb-1">City</label>
                                                <input type="text" name='shipping_city' className="w-[300px] border border-gray-300 px-4 py-2 text-sm text-gray-500" />
                                            </div>
                                        </div>

                                    </div>
                                )}

                                <div className="mb-5 flex gap-5">
                                    <div>
                                        <label className="block text-sm  mb-1">Order Notes</label>
                                        <textarea type="text" placeholder='Notes about your order,e.g.special notes for delivery.' name="order_notes" className="w-[620px] border border-gray-300 px-4 py-2 text-sm text-gray-500" rows={5} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='text-md pr-125 text-md bg-black text-white p-2 '>YOUR ORDER</div>
                            <div className=' flex bg-[#F2F2F2] mt-4 p-4 items-center border-b-1 border-gray-400 gap-60'>
                                <p className='text-sm pl-35 w-[300px]'>Product</p>
                                <p className='text-sm pl-35 w-[100px]'>Qty</p>
                                <p className='text-sm w-[100px]'>Total</p>
                            </div>

                            {
                                products.map((v, i) => {
                                    return (
                                        <div className='flex mt-4 p-4 items-center border-b-1 border-gray-400 gap-60 text-start'>
                                            <p className='text-sm pl-35 w-[300px]'>{v.name}</p>
                                            <p className='text-sm pl-35 w-[100px]'>{v.qty}</p>
                                            <p className='text-sm w-[100px]'>{v.qty * v.price}</p>
                                        </div>
                                    )
                                })
                            }

                            <div className=' flex p-4 mt-1 border-b-1 border-gray-400 gap-55'>
                                <p className='text-sm pl-32'>Cart Subtotal</p>
                                <p className='text-sm'>Rs.{totalAmount}</p>
                            </div>

                            <div className=' flex p-4 mt-1 border-b-1 border-gray-400 gap-56'>
                                <p className='text-sm pl-34'>Discount(-)</p>
                                <p className='text-sm'>Rs.0</p>
                            </div>

                            <div className=' flex p-4 mt-1 border-b-1 border-gray-400 gap-57'>
                                <p className='text-sm pl-33'>Order Total</p>
                                <p className='text-sm'>Rs.{totalAmount}</p>
                            </div>

                            <button type="submit" className="bg-[#C09578] hover:bg-[black] mt-10 text-white text-sm font-bold  px-6 py-2.5" disabled={orderLoading ? 'disabled' : ''}>
                                {orderLoading ? 'Loading....' : 'PLACE ORDER'}
                            </button>
                        </div>
                    </div>
                </form>
                <p className='pt-10 border-b-1 border-gray-200'></p>
                {/* <div className="flex items-center justify-between">
                    <a href="#" className="text-sm text-[#b5845a]">Lost your password?</a>
                </div> */}
                {/* <figure>
                    
                </figure>

                <p className='text-center pb-10 text-sm text-gray-500 font-medium '>Your Shopping cart is empty!</p> */}
            </div>
        </>
    )
}
