import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { HeaderBar } from './HeaderBar';

describe('HeaderBar (без проверки суммы в шапке)', () => {
  it('показывает название сайта и кнопку Cart', () => {
    renderWithProviders(<HeaderBar />);

    expect(screen.getByText(/vegetable/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();
  });

  it('открывает попап корзины по клику на Cart и показывает пустую заглушку', async () => {
    renderWithProviders(<HeaderBar />);

    const cartBtn = screen.getByRole('button', { name: /cart/i });
    fireEvent.click(cartBtn);

    expect(await screen.findByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
