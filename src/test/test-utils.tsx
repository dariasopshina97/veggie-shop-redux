import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import type { RootState } from '../app/store';

// combineReducers нужен чтобы TypeScript правильно вывел типы preloadedState
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export function renderWithProviders(
  ui: React.ReactNode,
  preloadedState?: Partial<RootState>,
) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MantineProvider
        defaultColorScheme="light"
        theme={{ primaryColor: 'green', defaultRadius: 'md' }}
      >
        {ui}
      </MantineProvider>
    </Provider>,
  );
}
