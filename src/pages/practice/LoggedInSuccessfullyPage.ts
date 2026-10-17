import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

export class LoggedInSuccessfullyPage extends BasePage {
  protected readonly path = '/logged-in-successfully/';
  readonly heading: Locator; readonly successMessage: Locator; readonly logOut: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Logged In Successfully', level: 1 });
    this.successMessage = page.getByText(/congratulations|successfully logged in/i).first();
    this.logOut = page.getByRole('link', { name: 'Log out' });
  }

  async waitUntilLoaded(): Promise<void> { await expect(this.heading).toBeVisible(); }

  async logout(): Promise<void> { await this.logOut.click(); }
}
