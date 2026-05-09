import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

var cartData = Cookies.get('cartData');

if(cartData == undefined){
  cartData = [];
} else {
  cartData = JSON.parse(Cookies.get('cartData'));
}

const initialState = {
  cartItems: cartData ?? [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {

      var checkCart = state.cartItems.filter((v) => {
        if (v.id == action.payload.cartData.id) {
          return v;
        }
      })

      if (checkCart.length == 0) {

        const dataSave = {
          id: action.payload.cartData.id,
          name: action.payload.cartData.name,
          image: action.payload.cartData.image,
          price: action.payload.cartData.price,
          description: action.payload.cartData.description,
          quantity: 1
        }

        const finalData = [dataSave, ...state.cartItems];
        Cookies.set('cartData', JSON.stringify(finalData));
        state.cartItems = finalData;
        toast.success('Add to Cart')
      } else {

      }


    },
    incrementCart: (state) => {
    },
    decrementCart: (state) => {
    },
    deleteCart: (state, action) => {
      if (confirm('Are you sure you want to remove ?')) {
        const finalData = state.cartItems.filter((v) => {
          if (action.payload != v.id) {
            return v
          }
        })

        state.cartItems = finalData;
        Cookies.set('cartData', JSON.stringify(finalData))
        toast.success('Delete succussfully.')
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, incrementCart, decrementCart, deleteCart } = cartSlice.actions

export default cartSlice.reducer