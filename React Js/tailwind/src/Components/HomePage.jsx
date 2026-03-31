import React, { useEffect, useState } from 'react'
import CommonProduct from './CommonProduct'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function HomePage() {

  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/products.php', {
      params : {
        limit : 8,
        categories : 'mens-shirts,mens-shoes' 
      }
    })
    .then((result) => {
      setMenProducts(result.data.data)
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    

    axios.get('https://wscubetech.co/ecommerce-api/products.php', {
      params : {
        limit : 8,
        categories : 'tops,skin-care' 
      }
    })
    .then((result) => {
      setWomenProducts(result.data.data)
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })

  }, [])


  return (
    <>
      <CommonProduct heading="Celebration wear for Men" tagline="Welcome to Bagtesh Fashion Buy Indian Men's Ethnic suits, Tuxedos, Sherwanis, Nehru jacket, Jodhpurs pants, Blazers, Shirts and much more." products={menProducts}/>

      <CommonProduct heading="Celebration wear for Women" tagline="Beautiful collection of Lehenga cholis, Sarees, Salwar suits for engagement, wedding and other ethnic occasions." products={womenProducts}/>
    </>
  )
}
