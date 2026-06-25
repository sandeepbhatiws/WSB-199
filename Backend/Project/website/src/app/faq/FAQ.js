import React from 'react'
import { FaGreaterThan } from "react-icons/fa6";
import Accordian from './Accordian';

export default function FAQ() {

  return (
    <>
      <div>
        <div className='text-center mt-5 p-10 border-t-1 border-gray-200'>
          <p className='text-4xl font-medium'>Frequently Questions</p>
          <div className='flex justify-center pt-3 items-center gap-2'>
            <p className='hover:text-yellow-600'>Home</p>
            <FaGreaterThan size={10} className='mt-1' />
            <p className='text-yellow-600'>Frequently Questions</p>
          </div>
        </div>

        <div className='mt-2 mr-30 border-t-1 border-gray-200 ml-20'>
          <Accordian/>
        </div>

      </div>
    </>
  )
}
