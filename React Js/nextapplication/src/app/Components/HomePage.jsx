'use client'
import React, { useEffect, useState } from 'react'
import CommonProduct from './CommonProduct'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function HomePage({men, women}) {

  const [menProducts, setMenProducts] = useState(men ?? []);
  const [womenProducts, setWomenProducts] = useState(women ?? []);


  return (
    <>
      <CommonProduct heading="Celebration wear for Men" tagline="Welcome to Bagtesh Fashion Buy Indian Men's Ethnic suits, Tuxedos, Sherwanis, Nehru jacket, Jodhpurs pants, Blazers, Shirts and much more." products={menProducts}/>

      <CommonProduct heading="Celebration wear for Women" tagline="Beautiful collection of Lehenga cholis, Sarees, Salwar suits for engagement, wedding and other ethnic occasions." products={womenProducts}/>
    </>
  )
}
