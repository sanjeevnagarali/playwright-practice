import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

export class LoginPage extends BasePage {
  protected readonly path = '/customer/account/login';
  readonly email: Locator; readonly password: Locator; readonly submit: Locator; readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.email = page.getByLabel('Email', { exact: true });
    this.password = page.getByLabel('Password', { exact: true });
    this.submit = page.getByRole('button', { name: 'Sign In' });
    this.error = page.getByRole('alert');
  }

  async login(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }

  async expectLoggedIn(): Promise<void> { await expect(this.page).toHaveURL(/customer\/account/); }
}
