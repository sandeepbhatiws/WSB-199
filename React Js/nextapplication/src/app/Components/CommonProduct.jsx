import React from 'react'
import ProductCard from './Common/ProductCard'
import ProductLoading from './Common/ProductLoading'

export default function CommonProduct({ heading, tagline, products }) {
    return (
        <>
            <section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
                <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    {/* <!-- Heading & Filters --> */}
                    <div class="mb-4 items-end justify-between space-y-4 sm:space-y-0 md:mb-8 text-center">
                        <h2 class="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl w-full">{heading}</h2>
                        <p className='pt-3'>{tagline}</p>
                    </div>
                    <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">

                        {
                            products.length > 0
                                ?
                                products.map((v, i) => {
                                    return (
                                        <ProductCard data={v} key={i} />
                                    )
                                })
                                :
                                <>
                                    <ProductLoading />
                                    <ProductLoading />
                                    <ProductLoading />
                                    <ProductLoading />
                                    <ProductLoading />
                                    <ProductLoading />
                                    <ProductLoading />
                                    <ProductLoading />
                                </>
                        }

                    </div>
                </div>
            </section>
        </>
    )
}
