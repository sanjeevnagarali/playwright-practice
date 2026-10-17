import { Locator } from '@playwright/test';
import { BaseComponent } from '../core/BaseComponent';

export class ProductCard extends BaseComponent {
  get name(): Locator { return this.root.getByTestId('product-name'); }
  get price(): Locator { return this.root.locator('.price').first(); }
  get addToCart(): Locator { return this.root.getByRole('button', { name: /add to cart/i }); }
  async open(): Promise<void> { await this.name.click(); }
}
