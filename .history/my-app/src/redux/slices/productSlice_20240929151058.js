import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCTS_URL = 'https://dummyjson.com/products';
const CATEGORIES_URL = 'https://dummyjson.com/products/categories';

// Fetch categories
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get(CATEGORIES_URL);
  return response.data;  // categories array
});

// Fetch products based on selected category, search term, and pagination
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ page, category, search }) => {
  let url = `${PRODUCTS_URL}?limit=10&skip=${(page - 1) * 10}`;
  if (category && category !== '') {
    url = `${PRODUCTS_URL}/category/${category}?limit=10&skip=${(page - 1) * 10}`;
  }
  if (search && search !== '') {
    url = `${PRODUCTS_URL}/search?q=${search}&limit=10&skip=${(page - 1) * 10}`;
  }

  const response = await axios.get(url);
  return response.data.products;  // array of products
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    products: [],
    status: 'idle',  // idle, loading, succeeded, failed
    error: null
  },
  reducers: {
    resetProducts: (state) => {
      state.products = [];  // clear the products when new category is selected
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = [...state.products, ...action.payload];  // append products for pagination
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
