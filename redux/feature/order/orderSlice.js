// src/features/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  order: null,
  loading: false,
  error: null,
};

// Async thunk for submitting an order
export const submitOrder = createAsyncThunk('order/submitOrder', async (orderData) => {
  const response = await axios.post('/api/orders', orderData); // Replace with your API endpoint
  return response.data;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // Save the order details
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      });
  },
});

// Export actions and reducer
export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
