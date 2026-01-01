import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch product suggestions
export const fetchProductSuggestions = createAsyncThunk(
  'products/fetchProductSuggestions',
  async (searchText) => {
    const response = await axios .get(`https://hawkers-accessories-backend.vercel.app/api/products?name=${searchText}&limit=5`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export const selectProducts = (state) => state.products.products;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

export default productSlice.reducer;
