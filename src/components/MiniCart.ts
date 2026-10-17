import { Page, Locator, expect } from '@playwright/test';

export class MiniCart {
  readonly toggle: Locator;
  readonly count: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.toggle = page.getByRole('link', { name: /shopping cart/i });
    this.count = page.locator('.counter-number');
    this.checkoutButton = page.getByRole('button', { name: /proceed to checkout/i });
  }

  async expectCount(n: number): Promise<void> {
    await expect(this.count).toHaveText(String(n));
  }

  async open(): Promise<void> {
    await this.toggle.click();
  }
}
