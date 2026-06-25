import React from 'react'

export default function Banner() {
  return (
    <div className='border-b border-b-zinc-200'>
      <figure>
        <img src='/banner.jpg' className='mt-5' />
      </figure>

      <div className="flex mx-30 my-8 gap-6">
        <figure className="relative group overflow-hidden flex-1">

          <img src="/chair1.webp" className="w-full h-[300] object-cover transition duration-500 group-hover:scale-110"/>
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="absolute inset-0 flex flex-col text-black pl-5 pt-5 z-10">
            <h2>Design Creative</h2>
            <p className="text-2xl font-bold">Chair Collection</p>
          </div>
        </figure>
        <figure className="relative group overflow-hidden flex-1">
          <img src="/chair2.webp" className="w-full h-[300] object-cover transition duration-500 group-hover:scale-110"/>
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="absolute inset-0 flex flex-col text-black pl-5 pt-5 z-10">
            <h2>Bestselling Products</h2>
            <p className="text-2xl font-bold">Chair Collection</p>
          </div>
        </figure>
        <figure className="relative group overflow-hidden flex-1">
          <img src="/chair3.webp" className="w-full h-[300] object-cover transition duration-500 group-hover:scale-110"/>
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="absolute inset-0 flex flex-col text-black pl-5 pt-5 z-10">
            <h2>Onsale Products</h2>
            <p className="text-2xl font-bold">Chair Collection</p>
          </div>
        </figure>
      </div>
    </div>
  )
}
