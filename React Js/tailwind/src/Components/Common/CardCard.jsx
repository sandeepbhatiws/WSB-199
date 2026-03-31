import React, { useContext, useEffect, useState } from 'react'
import { CommonContext } from './ContextApi'

export default function CardCard({v}) {

    const { addToFavourite, favouriteData } = useContext(CommonContext);

    const [isFavourite, setIsFavourite] = useState(0);

    console.log(favouriteData);

    useEffect(() => {
        favouriteData.forEach((item) => {
            if(item.id == v.id){
                setIsFavourite(1)
            }
        })
    }, [favouriteData])


    return (
        <>
            <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" class="shrink-0 md:order-1">
                        <img class="h-20 w-20 dark:hidden" src={v.image} alt="imac image" />
                        <img class="hidden h-20 w-20 dark:block" src={v.image} alt="imac image" />
                    </a>

                    <label for="counter-input" class="sr-only">Choose quantity:</label>
                    <div class="flex items-center justify-between md:order-3 md:justify-end">
                        <div class="flex items-center">
                            <button onClick={() => decrementCart(v.id)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input type="text" id="counter-input" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={v.quantity} required />
                            <button onClick={() => incrementCart(v.id)} type="button" id="increment-button" data-input-counter-increment="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>
                        <div class="text-end md:order-4 md:w-32">
                            <p class="text-base font-bold text-gray-900 dark:text-white">${v.price * v.quantity}</p>
                        </div>
                    </div>

                    <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">{v.name}</a>
                        <p>{v.description}</p>

                        <div class="flex items-center gap-4">
                            <button onClick={ () => addToFavourite(v) } type="button" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                
                                {
                                    isFavourite
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/></svg>
                                    :
                                    <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                </svg>
                                }

                                
                                Add to Favorites
                            </button>

                            <button onClick={() => deleteCart(v.id)} type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
