import React from 'react'
import ProductCard from '../Common/ProductCard';

export default function BestSelling() {

    const bestSelling = [
        {
            title: "Nest Of Tables",
            name: "Caroline Study Tables",
            price: 2500,
            oldPrice: 3000,
            image: "/f1.jpg",
        },
        {
            title: "Coffee Tables",
            name: "Evan Coffee Table",
            price: 2300,
            oldPrice: 2600,
            image: "/f2.jpg",
        },
        {
            title: "Shoe Racks",
            name: "Gloria Shoe Racks",
            price: 2900,
            oldPrice: 3400,
            image: "/f3.jpg",
        },
        {
            title: "Bookshelves",
            name: "Erica Bookshelfs",
            price: 30000,
            oldPrice: 38000,
            image: "/f4.jpg",
        },
        {
            title: "Wooden Sofa Cum Bed",
            name: "Sapien Sofa Cum Bed",
            price: 54000,
            oldPrice: 64000,
            image: "/f5.jpg",
        },
    ];

    return (
        <>
            <figure className="relative group overflow-hidden flex-1">

                <img src="/best.jpg" className="w-full h-full" />
                <div className="absolute inset-0 "></div>
                <div className="absolute pl-55 pt-30 inset-0 flex flex-col text-black pl-5 pt-5 z-10 transition duration-500">
                    <h1 className="text-5xl pb-5 font-medium">New Trending Collection</h1>
                    <h2 className="text-xl">We Believe That Good Design is Always in Season</h2>
                    <div className='text-left pt-10'>
                        <button className='border-2 p-3 px-8 text-xl font-medium'>Shopping Now</button>
                    </div>
                </div>
            </figure>

            <section className="">

                {/* TABS */}
                <div className="text-left mb-2 mt-10">
                    <div className="px-6 py-2 pl-30 font-bold text-2xl" >
                        Bestselling Products 
                    </div>

                    <div className="grid shadow-xl-30 grid-cols-5 m-30 gap-7 mt-5">
                        {
                            bestSelling.map((item, index) => {
                                return <ProductCard key={index}{...item} />
                            })
                        }
                    </div>

                </div>

            </section>
        </>
    )
}
