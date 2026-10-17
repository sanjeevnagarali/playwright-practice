import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

export class SellerLoginPage extends BasePage {
  protected readonly path = '/login';
  readonly email: Locator; readonly password: Locator; readonly submit: Locator;
  constructor(page: Page) {
    super(page);
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.submit = page.getByRole('button', { name: /sign in|log in/i });
  }
  async login(email: string, password: string): Promise<void> {
    await this.email.fill(email); await this.password.fill(password); await this.submit.click();
  }
}
