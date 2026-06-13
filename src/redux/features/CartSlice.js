import { createSlice } from '@reduxjs/toolkit'
import { toast, Slide } from 'react-toastify';

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
const initialState = {
  query: '',
  count: savedCart.length,
  items: savedCart
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addQuery: (state, action) => {
      state.query = action.payload


    },
    increment: (state, action) => {

      state.count += 1
    },
    decrement: (state, action) => {
      state.count -= 1
    },
    addTocart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (!existingItem) {
        state.items.push(action.payload)
        state.count += 1
        localStorage.setItem('cart', JSON.stringify(state.items))
      }

    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id)
      state.count =state.items.length
      localStorage.setItem('cart',JSON.stringify(state.items))

    },
    addToast: (state, action) => {
      toast.success('Product add ✅', {
        position: "top-right",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }

  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, addTocart, addToast, addQuery, removeFromCart } = cartSlice.actions

export default cartSlice.reducer