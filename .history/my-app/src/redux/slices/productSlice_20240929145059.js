import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCTS_URL = 'https://dummyjson.com/products';
const CATEGORIES_URL = 'https://dummyjson.com/products/categories';

// Thunks to fetch data
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get(CATEGORIES_URL);
  return response.data;
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ page, category, search }) => {
  let url = `${PRODUCTS_URL}?limit=10&skip=${(page - 1) * 10}`;
  if (category) url += `&category=${category}`;
  if (search) url += `&q=${search}`;
  
  const response = await axios.get(url);
  return response.data.products;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = [...state.products, ...action.payload];
      });
  },
});

export default productSlice.reducer;

