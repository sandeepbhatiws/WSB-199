"use client";

import ProductCard from "../Common/ProductCard";


export default function FeaturedProducts() {

  const featuredProducts = [
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
    {
      title: "2 Seater Sofa",
      name: "Ganthur Sheesham Wood Sofa Set",
      price: 7600,
      oldPrice: 8000,
      image: "/f6.jpg",
    },
    {
      title: "Wooden Jhula",
      name: "Calina Swing Jhula",
      price: 58000,
      oldPrice: 65000,
      image: "/f7.jpg",
    },
  ];

  return (
    <section className="">

      {/* TABS */}
      <div className="text-center mb-10">
        <div className="px-6 py-2 font-bold text-4xl" >
          Featured
        </div>

        <div className="grid grid-cols-4 m-30 gap-7 mt-5">
          {
            featuredProducts.map((item , index) =>{
               return <ProductCard key={index}{...item}/>
            })
          }
        </div>

      </div>

    </section>
  );
}