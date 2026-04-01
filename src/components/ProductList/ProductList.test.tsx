import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '../../test/test-utils';
import { ProductList } from './ProductList';

// Мокаем fetchProducts, чтобы не делать реальных HTTP-запросов в тестах
vi.mock('../../features/products/productsSlice', async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import('../../features/products/productsSlice')
    >();
  return {
    ...actual,
    fetchProducts: () => ({ type: 'test/noop' }),
  };
});

it('показывает скелетоны, пока данные загружаются', () => {
  renderWithProviders(<ProductList />, {
    products: { products: [], loading: true, error: null },
  });

  // Mantine Skeleton рендерит элементы с атрибутом data-visible
  expect(document.querySelector('[data-visible]')).toBeInTheDocument();
});

it('рендерит карточки, когда данные загружены', () => {
  renderWithProviders(<ProductList />, {
    products: {
      loading: false,
      error: null,
      products: [
        {
          id: 1,
          name: 'Tomato - 1 Kg',
          price: 3,
          image: 'tomato.png',
          category: 'vegetables',
        },
      ],
    },
  });

  expect(screen.getByText('Tomato')).toBeInTheDocument();
});
