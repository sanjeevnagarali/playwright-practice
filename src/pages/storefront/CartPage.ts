import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

export class CartPage extends BasePage {
  protected readonly path = '/checkout/cart/';
  readonly rows: Locator; readonly grandTotal: Locator; readonly checkout: Locator; readonly empty: Locator;

  constructor(page: Page) {
    super(page);
    this.rows = page.locator('tbody.cart.item');
    this.grandTotal = page.locator('.grand.totals .price');
    this.checkout = page.getByRole('button', { name: 'Proceed to Checkout' });
    this.empty = page.getByText(/you have no items in your shopping cart/i);
  }

  async removeItem(index = 0): Promise<void> { await this.rows.nth(index).getByRole('link', { name: /remove item/i }).click(); }
  async expectItemCount(n: number): Promise<void> { await expect(this.rows).toHaveCount(n); }
}
