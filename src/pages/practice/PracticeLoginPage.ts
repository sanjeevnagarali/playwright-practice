import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

export class PracticeLoginPage extends BasePage {
  protected readonly path = '/practice-test-login/';
  readonly username: Locator; readonly password: Locator; readonly submit: Locator; readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByRole('textbox', { name: 'Username' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.submit = page.getByRole('button', { name: 'Submit' });
    // No role/label/test-id on the error banner, and its text also appears in the page's instructions.
    // Missing test id for developers: data-testid="login-error".
    this.error = page.locator('#error');
  }

  async waitUntilLoaded(): Promise<void> { await expect(this.username).toBeVisible(); }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }
}
