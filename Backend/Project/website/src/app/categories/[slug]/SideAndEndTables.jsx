import React from 'react'
import SidePanel from './SidePanel'
import ProductCard from '@/Components/Common/ProductCard'

export default function SideAndEndTables() {

  const sideTable = [{
    title: "Side and End Tables",
    name: "Hrithvik Stool",
    price: 6000,
    oldPrice: 7000,
    image: "/f1.jpg",
  }]


  return (
    <>
      <div className='text-center text-5xl pb-10 font-bold pt-5 mt-5 border-t-1 border-b-1 border-gray-300'>Product Listing</div>
      <div className='flex'>
        <SidePanel />
        <div className='w-250'>
          <div class="mx-5 w-full border mt-5 border-gray-300 px-6 py-4 flex items-center justify-between">
            <div></div>
            <div class="flex items-center gap-6 text-gray-700">
              <div class="flex items-center gap-2">
                <span class="text-sm">Sort By :</span>
                <select class="border border-gray-300 bg-white text-sm px-3 py-1.5 rounded focus:outline-none">
                  <option>Sort By</option>
                  <option>Latest</option>
                  <option>Price Low to High</option>
                  <option>Price High to Low</option>
                </select>
              </div>
              <div class="text-sm">
                Showing 1–1 of 1 results
              </div>
            </div>
          </div>
          <div className="mt-5 ml-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              sideTable.map((item, index) => {
                return <ProductCard key={index} {...item} />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}
