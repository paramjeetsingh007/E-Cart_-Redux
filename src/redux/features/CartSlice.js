import { createSlice } from '@reduxjs/toolkit'
import { toast, Slide } from 'react-toastify';

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
const initialState = {
  query: '',
  count: savedCart.length,
  items: savedCart,
   

}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addQuery: (state, action) => {
      state.query = action.payload


    },
    increment: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    decrement: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Agar quantity 1 hai toh item remove kar do
          state.items = state.items.filter((i) => i.id !== action.payload.id);
          state.count = state.items.length;
        }
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    addTocart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (!existingItem) {
        state.items.push({ ...action.payload, quantity: 1 })
        state.count += 1
        localStorage.setItem('cart', JSON.stringify(state.items))
      }


    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id)
      state.count = state.items.length
      localStorage.setItem('cart', JSON.stringify(state.items))

    },
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
      localStorage.removeItem('cart');
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload.method;
      state.totalAmount = action.payload.totalAmount; // ✅ amount save karo
      console.log(state.totalAmount);
      
      state.currentStep = 3;
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
export const { increment, decrement, addTocart, addToast, addQuery, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer