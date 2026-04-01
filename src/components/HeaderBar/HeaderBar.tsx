import { useState } from 'react';
import { Group, Title, Badge, Button, Popover } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { CartMenu } from '../CartPopover/CartPopover';
import { addOne, removeOne } from '../../features/cart/cartSlice';
import type { RootState, AppDispatch } from '../../app/store';

export function HeaderBar() {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((state: RootState) => state.cart.items);

  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.qty * item.product.price,
    0,
  );

  return (
    <Group h="100%" px="md" justify="space-between" align="center">
      <Group gap="xs" align="center">
        <Title order={3} className="header__title">
          Vegetable
        </Title>

        <Badge variant="filled" className="badge--shop">
          SHOP
        </Badge>
      </Group>

      <Popover
        opened={opened}
        onChange={setOpened}
        position="bottom-end"
        withArrow
        shadow="md"
      >
        <Popover.Target>
          <Button
            radius={8}
            w={144}
            h={44}
            variant="filled"
            className="cartButton"
            leftSection={
              totalCount > 0 ? (
                <span className="cartButton__counter">{totalCount}</span>
              ) : null
            }
            rightSection={<IconShoppingCart size={16} />}
            onClick={() => setOpened((v) => !v)}
          >
            Cart
          </Button>
        </Popover.Target>

        <Popover.Dropdown className="popover__dropdown">
          <CartMenu
            items={items}
            totalPrice={totalPrice}
            addOne={(id: number) => dispatch(addOne(id))}
            removeOne={(id: number) => dispatch(removeOne(id))}
          />
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
}
