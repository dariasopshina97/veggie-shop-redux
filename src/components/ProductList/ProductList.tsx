import { useEffect } from 'react';
import { Alert, SimpleGrid, Skeleton, Stack } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../ProductCard/ProductCard';
import { fetchProducts } from '../../features/products/productsSlice';
import { addItem } from '../../features/cart/cartSlice';
import type { RootState, AppDispatch } from '../../app/store';

const SKELETONS = Array.from({ length: 8 });

export function ProductList() {
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <SimpleGrid cols={4} spacing="md">
        {SKELETONS.map((_, i) => (
          <Stack key={i} gap={16}>
            <Skeleton height={300} radius={12} />
            <Skeleton height={24} />
            <Skeleton height={24} />
            <Skeleton height={44} radius="md" />
          </Stack>
        ))}
      </SimpleGrid>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Ошибка загрузки">
        {error}
      </Alert>
    );
  }

  return (
    <SimpleGrid cols={4} spacing="md">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAdd={(product, qty) => dispatch(addItem({ product, qty }))}
        />
      ))}
    </SimpleGrid>
  );
}
