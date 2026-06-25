import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className='flex px-50 py-20 pb-0 pl-25 gap-25 pr-20'>
        <div>
          <h5 className='font-bold pb-5 text-xl'>Contact Us</h5>
          <ul className='text-gray-500'>
            <li className='pb-2'>
              Address : Claritas est etiam processus dynamicus
            </li>
            <li className='pb-2'>
              <a href='tel:98745612330'>Phone : 98745612330</a>
            </li>
            <li className='pb-2'>
              <a href='mailto:furniture@gmail.com'>Email : furniture@gmail.com</a>
            </li>
          </ul>
          <div className='flex pt-3 gap-5'>
            <FaFacebookF size={20}/>
            <FaInstagram size={20}/>
            <FaTwitter size={20}/>
            <FaYoutube size={20}/>
            <FaTelegram size={20}/>
          </div>
        </div>
        <div>
          <h5 className='font-bold pb-5 text-xl'>Information</h5>
          <ul className='text-gray-600'>
            <li className='pb-2'>
              <a href='/about-us'>About Us </a>
            </li>
            <li className='pb-2'>
              <a href='/contact-us'>Contact Us</a>
            </li>
            <li className='pb-2'>
              <a href='/faq'>Frequently Questions</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className='font-bold pb-5 text-xl'>My Account</h5>
          <ul className='text-gray-600'>
            <li className='pb-2'>
              <a href='/my-dashboard'>My Dashboard</a>
            </li>
            <li className='pb-2'>
              <a href='#'>Wishlist</a>
            </li>
            <li className='pb-2'>
              <a href='/cart'>Cart</a>
            </li>
            <li className='pb-2'>
              <a href='#'>Checkout</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className='font-bold pb-5 text-xl'>Top Rated Products</h5>
          <div className='flex gap-3 text-gray-600 pb-2 border-b border-gray-500'>
            <figure>
              <img src='/o2.jpg' width={95} />
            </figure>
            <div>
              <p className='pb-1'>Chest Of Drawers</p>
              <p className='pb-1'>Isaac Chest of Drawer</p>
              <p>Rs 25,000</p>
            </div>
          </div>
          <div className='flex gap-3 text-gray-600 pb-2 pt-3'>
            <figure>
              <img src='/o2.jpg' width={95} />
            </figure>
            <div>
              <p className='pb-1'>L Shape Sofa</p>
              <p className='pb-1'>Harper L Shaped Wooden Sofa with Drawer</p>
              <p>Rs 76,000</p>
            </div>
          </div>
        </div>
      </div>

      <div className='border-zinc-300 flex gap-5 border-y-2 m-25 mb-10 mt-10 p-5 justify-center'>
        <a className='text-mist-700 font-medium' href='/'>Home </a>
        <a className='text-mist-700 font-medium' href='#'>Online Store </a>
        <a className='text-mist-700 font-medium' href='/privacy-policy'>Privacy Policy </a>
        <a className='text-mist-700 font-medium' href='#'>Terms Of Use </a>
      </div>

      <div className='m-auto pb-10'>
        <p className='pb-5'>All Rights Reserved By Furniture | © 2026</p>
        <figure className='pl-10'>
          <img src='/papyel2.png'/>
        </figure>
      </div>
    </>
  )
}