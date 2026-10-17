import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

export class SellerProductPage extends BasePage {
  protected readonly path = '/products/new';
  readonly name: Locator; readonly sku: Locator; readonly price: Locator; readonly save: Locator; readonly toast: Locator;
  constructor(page: Page) {
    super(page);
    this.name = page.getByLabel('Product name'); this.sku = page.getByLabel('SKU');
    this.price = page.getByLabel('Price'); this.save = page.getByRole('button', { name: 'Save' });
    this.toast = page.getByRole('status');
  }
  async create(name: string, sku: string, price: number): Promise<void> {
    await this.name.fill(name); await this.sku.fill(sku); await this.price.fill(String(price));
    await this.save.click();
    await expect(this.toast).toContainText(/saved|created/i);
  }
}
