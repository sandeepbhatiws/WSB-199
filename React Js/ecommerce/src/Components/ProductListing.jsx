import React, { useEffect, useState } from 'react'
import Header from './Common/Header'
import Footer from './Common/Footer'
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from './Common/ProductCard';
import { useParams } from 'react-router';

export default function ProductListing() {

    const [products, setProducts] = useState([]);
    const [url, setUrl] = useState('https://dummyjson.com/products');

    const params = useParams();

    useEffect(() => {
        if(params.slug == undefined){
            setUrl('https://dummyjson.com/products');
        } else{
            setUrl('https://dummyjson.com/products/category/'+params.slug)
        }
    },[params])

    useEffect(() => {
        axios.get(url)
            .then((result) => {
                setProducts(result.data.products)
            })
            .catch(() => {
                toast.error('Something went wrong !')
            })
    }, [url])

    return (
        <>
            <Header />

            <main class="container">
                {/* <!-- Related products --> */}
                <section class="related-products">
                    <h2 class="section-title w-100 text-center">Product Listing</h2>
                    <div class="products-grid">
                        {/* <!-- Product 1 --> */}

                        {
                            products.map((value, index) => {
                                return (
                                    <ProductCard key={index} product={value} />
                                )
                            })
                        }

                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
