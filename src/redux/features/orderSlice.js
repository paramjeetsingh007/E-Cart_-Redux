import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentStep: 1,
    address: null,
    paymentMethod: null,
    totalAmount: 0,
    orderId: null,
    orderPlaced: false,
  },
  reducers: {
    saveAddress: (state, action) => {
      state.address = action.payload;
      state.currentStep = 2;
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload.method;      // ✅ .method nikalo
      state.totalAmount = action.payload.totalAmount;   // ✅ totalAmount save karo
      state.currentStep = 3;
    },
    placeOrder: (state) => {
      state.orderId = 'ORD-' + Date.now();
      state.orderPlaced = true;
    },
    resetOrder: (state) => {
      state.currentStep = 1;
      state.address = null;
      state.paymentMethod = null;
      state.totalAmount = 0;   // ✅ reset mein bhi add karo
      state.orderId = null;
      state.orderPlaced = false;
    },
    goToStep: (state, action) => {
      state.currentStep = action.payload;
    }
  }
});

export const { saveAddress, savePaymentMethod, placeOrder, resetOrder, goToStep } = orderSlice.actions;
export default orderSlice.reducer;