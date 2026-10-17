import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

export class OrderConfirmationPage extends BasePage {
  protected readonly path = '/checkout/onepage/success/';
  readonly heading: Locator; readonly orderNumber: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /thank you for your purchase/i });
    this.orderNumber = page.locator('.checkout-success .order-number');
  }

  async expectPlaced(): Promise<string> {
    await expect(this.heading).toBeVisible();
    return (await this.orderNumber.innerText()).trim();
  }
}
