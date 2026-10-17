import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

export class SellerDashboardPage extends BasePage {
  protected readonly path = '/dashboard';
  readonly heading: Locator;
  constructor(page: Page) { super(page); this.heading = page.getByRole('heading', { name: /dashboard/i }); }
  async expectVisible(): Promise<void> { await expect(this.heading).toBeVisible(); }
}
