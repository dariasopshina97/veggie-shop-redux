import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';

type CartItem = {
  product: Product;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

type AddItemPayload = {
  product: Product;
  qty: number;
};

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const { product } = action.payload;
      const qty = Math.max(1, action.payload.qty || 1);

      // Ищем товар в корзине, чтобы не дублировать позицию.
      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        existingItem.qty += qty;
      } else {
        state.items.push({ product, qty });
      }
    },
    addOne: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId,
      );
      if (existingItem) {
        existingItem.qty += 1;
      }
    },
    removeOne: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      // Ищем индекс, чтобы можно было удалить элемент через splice.
      const index = state.items.findIndex(
        (item) => item.product.id === productId,
      );
      if (index === -1) {
        return;
      }

      if (state.items[index].qty <= 1) {
        state.items.splice(index, 1);
      } else {
        state.items[index].qty -= 1;
      }
    },
  },
});

export const { addItem, addOne, removeOne } = cartSlice.actions;
export default cartSlice.reducer;
