import React from 'react'
import banner from './assets/images/banner.png'
import { useState } from 'react';

export default function AboutUs() {

    var [counter, setCounter] = useState(6);

    const decrement = () => {
        counter--;
        setCounter(counter);
    }

    const increment = () => {
        counter++;
        setCounter(counter);
    }


    // console.log(status);

  return (
    <>
        <div className='count'>
            <button onClick={ decrement }>-</button>
            <button>{ counter }</button>
            <button onClick={ increment }>+</button>
        </div>




    {/* <img src='/banner.png' />
    <img src={ banner } />
      <div className='text-center' style={{ display : `${ (status == 0) ? 'none' : '' }`  }}>About Us</div> */}
    </>
  )
}
