import Header from '@/Components/Common/Header'
import Banner from '@/Components/Home/Banner'
import BestSelling from '@/Components/Home/BestSelling'
import Customers from '@/Components/Home/Customers'
import FeaturedProducts from '@/Components/Home/FeaturedProducts'
import React from 'react'

export default function page() {
  return (
    <>
      <Banner/>
      <FeaturedProducts/>
      <BestSelling/>
      <Customers/>
    </>
  )
}