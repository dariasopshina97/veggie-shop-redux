import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types';

const PRODUCTS_URL =
  'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

type ProductsState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(PRODUCTS_URL);

    if (!response.ok) {
      return rejectWithValue('Ошибка загрузки');
    }

    const data = (await response.json()) as Product[];
    return data;
  } catch {
    return rejectWithValue('Ошибка загрузки');
  }
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Ошибка загрузки';
      });
  },
});

export default productsSlice.reducer;
