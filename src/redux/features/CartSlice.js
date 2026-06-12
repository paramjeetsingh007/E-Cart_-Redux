import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  query: '',
  count: 0,
  items:[]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addQuery:(state,action)=>{
        state.query=action.payload
        

    },
    increment: (state,action) => {
  
      state.count += 1
    },
    decrement: (state,action) => {
      state.count -= 1
    },
    addTocart: (state,action) => {
        state.items.push(action.payload)
        state.count += 1
        localStorage.setItem('cart',JSON.stringify(state.items))
    },
    removeFromCart: (state,action) => {
        state.items= state.items.filter(item=> item.id!==action.payload.id)
        state.count -= 1
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, addTocart, addQuery,removeFromCart } = cartSlice.actions

export default cartSlice.reducer