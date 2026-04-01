import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithProviders } from '../../test/test-utils';
import { ProductCard } from './ProductCard';

const product = {
  id: 1,
  name: 'Cucumber - 1 Kg',
  price: 5,
  image: 'cucumber.png',
  category: 'vegetables',
};

describe('ProductCard', () => {
  it('клики по "+" и "−" меняют количество на карточке', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    renderWithProviders(<ProductCard product={product} onAdd={onAdd} />);

    const title = screen.getByText('Cucumber');
    const card =
      title.closest('article') ||
      title.closest('[data-mantine-card]') ||
      document.body;

    const buttons = within(card).getAllByRole('button');

    expect(buttons.length).toBeGreaterThanOrEqual(3);

    const minusBtn = buttons[0];
    const plusBtn = buttons[1];
    const addBtn = buttons.find((b) =>
      /add to cart/i.test(b.textContent || ''),
    )!;

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();

    await user.click(plusBtn);
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();

    await user.click(minusBtn);
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();

    expect(onAdd).not.toHaveBeenCalled();

    await user.click(plusBtn);
    await user.click(plusBtn);
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();

    await user.click(addBtn);
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }), 3);
  });

  it('отображает корректное название без " - 1 Kg"', () => {
    const onAdd = vi.fn();
    renderWithProviders(<ProductCard product={product} onAdd={onAdd} />);

    expect(screen.getByText('Cucumber')).toBeInTheDocument();
  });
});
