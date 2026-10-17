import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

export class SellerOrdersPage extends BasePage {
  protected readonly path = '/orders';
  readonly rows: Locator;
  constructor(page: Page) { super(page); this.rows = page.getByRole('row'); }
  orderRow(orderId: string): Locator { return this.rows.filter({ hasText: orderId }); }
  async markShipped(orderId: string): Promise<void> {
    await this.orderRow(orderId).getByRole('button', { name: /ship/i }).click();
  }
}
