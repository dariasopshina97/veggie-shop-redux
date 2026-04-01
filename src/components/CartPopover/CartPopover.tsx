import {
  Stack,
  ScrollArea,
  Image,
  Text,
  Group,
  Divider,
  ActionIcon,
  Box,
} from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import type { CartItem } from '../../types';
import cartEmpty from '../../assets/cart_empty.svg';

type Props = {
  items: CartItem[];
  totalPrice: number;
  addOne: (productId: number) => void;
  removeOne: (productId: number) => void;
};

export function CartMenu({ items, totalPrice, addOne, removeOne }: Props) {
  if (items.length === 0) {
    return (
      <Stack align="center" justify="center" gap={8}>
        <Image src={cartEmpty} alt="Your cart is empty" w={180} fit="contain" />
        <Text c="dimmed">Your cart is empty!</Text>
      </Stack>
    );
  }

  return (
    <>
      <ScrollArea className="cartMenu__popover">
        <Stack gap={12}>
          {items.map(({ product, qty }, idx) => (
            <Box key={product.id}>
              <Group justify="space-between" align="center" wrap="nowrap">
                <Group gap="sm" wrap="nowrap" align="center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    w={36}
                    h={36}
                    radius="sm"
                  />
                  <Stack gap={4}>
                    <Group gap={6} align="baseline">
                      <Text fw={600}>
                        {product.name.replace(' - 1 Kg', '')}
                      </Text>
                      <Text size="sm" c="dimmed">
                        1 kg
                      </Text>
                    </Group>
                    <Text fw={700}>${qty * product.price}</Text>
                  </Stack>
                </Group>

                <Group gap={6} align="center">
                  <ActionIcon
                    radius={8}
                    className="cartMenu__btn"
                    onClick={() => removeOne(product.id)}
                    aria-label="Decrease quantity"
                  >
                    <IconMinus size={14} color="#212529" />
                  </ActionIcon>

                  <Text className="cartMenu__qty" aria-live="polite">
                    {qty}
                  </Text>

                  <ActionIcon
                    radius={8}
                    className="cartMenu__btn"
                    onClick={() => addOne(product.id)}
                    aria-label="Increase quantity"
                  >
                    <IconPlus size={14} color="#212529" />
                  </ActionIcon>
                </Group>
              </Group>

              {idx < items.length - 1 && <Divider mt={12} />}
            </Box>
          ))}
        </Stack>
      </ScrollArea>

      <Divider />
      <Group justify="space-between" align="center">
        <Text fw={600}>Total</Text>
        <Text fw={600}>${totalPrice}</Text>
      </Group>
    </>
  );
}
