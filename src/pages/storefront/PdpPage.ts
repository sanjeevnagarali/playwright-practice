import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

export class PdpPage extends BasePage {
  protected readonly path = '/';
  readonly title: Locator; readonly addToCart: Locator; readonly qty: Locator;
  readonly successMessage: Locator; readonly stockStatus: Locator; readonly notifyMe: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByRole('heading', { level: 1 });
    this.addToCart = page.getByRole('button', { name: 'Add to Cart' });
    this.qty = page.getByLabel('Qty');
    this.successMessage = page.getByRole('alert').filter({ hasText: /you added/i });
    this.stockStatus = page.locator('.stock');
    this.notifyMe = page.getByRole('link', { name: /notify me when this product is in stock/i });
  }

  async openBySlug(slug: string): Promise<void> { await this.page.goto(`/${slug}.html`); await this.waitUntilLoaded(); }

  async add(qty = 1): Promise<void> {
    await this.qty.fill(String(qty));
    await this.addToCart.click();
    await expect(this.successMessage).toBeVisible();
  }
}
