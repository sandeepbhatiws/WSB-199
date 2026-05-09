import React, { createContext, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router';
import { toast } from 'react-toastify';

const CommonContext = createContext();

export default function ContextApi({ children }) {

    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const [cartData, setCartData] = useState(cartItems ?? []);
    const [isLogin, setIsLogin] = useState(0);

    const navigate = useNavigate();

    const addToCart = (productInfo) => {

        if (isLogin == 0) {
            navigate('/login')
        } else {
            const checkCart = cartData.filter((v) => {
                if (productInfo.id == v.id) {
                    return v
                }
            })

            if (checkCart.length == 0) {
                const dataSave = {
                    id: productInfo.id,
                    name: productInfo.name,
                    image: productInfo.image,
                    price: productInfo.price,
                    description: productInfo.description,
                    quantity: 1
                }

                const finalData = [dataSave, ...cartData]
                setCartData(finalData);
                localStorage.setItem('cartItems', JSON.stringify(finalData))
                toast.success('Add to cart.')
            } else {

                const finalData = cartData.map((v) => {
                    if (productInfo.id == v.id) {
                        if (v.quantity < 5) {
                            v.quantity++;
                            toast.success('Update Cart')
                            return v;
                        } else {
                            toast.error('Maximum Quanity reached.')
                            return v;
                        }

                    } else {
                        return v;
                    }
                })

                setCartData(finalData);
                localStorage.setItem('cartItems', JSON.stringify(finalData))

            }
        }


    }

    const incrementCart = (id) => {
        const finalData = cartData.map((v) => {
            if (id == v.id) {
                if (v.quantity < 5) {
                    v.quantity++;
                    toast.success('Update Cart')
                    return v;
                } else {
                    toast.error('Maximum quantity reached.')
                    return v;
                }

            } else {
                return v;
            }
        })

        setCartData(finalData);
        localStorage.setItem('cartItems', JSON.stringify(finalData))
    }

    const decrementCart = (id) => {
        const finalData = cartData.map((v) => {
            if (id == v.id) {
                if (v.quantity > 1) {
                    v.quantity--;
                    toast.success('Update Cart')
                    return v;
                } else {
                    toast.error('Minimum 1 Quanity required.')
                    return v;
                }

            } else {
                return v;
            }
        })

        setCartData(finalData);
        localStorage.setItem('cartItems', JSON.stringify(finalData))
    }

    const deleteCart = (id) => {

        if (confirm('Are you sure you want to remove ?')) {
            const finalData = cartData.filter((v) => {
                if (id != v.id) {
                    return v
                }
            })

            setCartData(finalData);
            localStorage.setItem('cartItems', JSON.stringify(finalData))
            toast.success('Delete succussfully.')
        }
    }


    const favouriteItems = JSON.parse(localStorage.getItem('favouriteItems'));
    const [favouriteData, setFavouriteData] = useState(favouriteItems ?? []);

    const addToFavourite = (productInfo) => {

        const checkFavourite = favouriteData.filter((v) => {
            if (productInfo.id == v.id) {
                return v
            }
        })

        if (checkFavourite.length == 0) {
            const dataSave = {
                id: productInfo.id,
                name: productInfo.name,
                image: productInfo.image,
                price: productInfo.price,
                description: productInfo.description,
            }

            const finalData = [dataSave, ...favouriteData]
            setFavouriteData(finalData);
            localStorage.setItem('favouriteItems', JSON.stringify(finalData))
            toast.success('Add to favourite.')
        } else {

            if (favouriteData.length == 1) {
                const finalData = [];

                setFavouriteData(finalData);
                localStorage.setItem('favouriteItems', JSON.stringify(finalData))
                toast.success('Remove from favourite.')
            } else {
                const finalData = favouriteData.map((v) => {
                    if (productInfo.id != v.id) {
                        return v;
                    }
                })

                setFavouriteData(finalData);
                localStorage.setItem('favouriteItems', JSON.stringify(finalData))
                toast.success('Remove from favourite.')
            }

        }
    }

    const data = { isLogin, cartData, addToCart, incrementCart, decrementCart, deleteCart, addToFavourite, favouriteData }

    return (
        <>
            <CommonContext.Provider value={data}>
                {children}
            </CommonContext.Provider>
        </>
    )
}

export { CommonContext }