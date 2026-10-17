import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { Customer } from '../../data/models';

export class RegistrationPage extends BasePage {
  protected readonly path = '/customer/account/create';
  readonly firstName: Locator; readonly lastName: Locator; readonly email: Locator;
  readonly password: Locator; readonly confirm: Locator; readonly submit: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByLabel('First Name');
    this.lastName = page.getByLabel('Last Name');
    this.email = page.getByLabel('Email', { exact: true });
    this.password = page.getByLabel('Password', { exact: true });
    this.confirm = page.getByLabel('Confirm Password');
    this.submit = page.getByRole('button', { name: 'Create an Account' });
  }

  async register(c: Customer): Promise<void> {
    await this.firstName.fill(c.firstName);
    await this.lastName.fill(c.lastName);
    await this.email.fill(c.email);
    await this.password.fill(c.password);
    await this.confirm.fill(c.password);
    await this.submit.click();
  }
}
