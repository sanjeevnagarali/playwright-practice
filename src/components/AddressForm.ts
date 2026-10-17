import { Page, Locator } from '@playwright/test';
import { Address } from '../data/models';

export class AddressForm {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly street: Locator;
  readonly city: Locator;
  readonly region: Locator;
  readonly postcode: Locator;
  readonly country: Locator;
  readonly phone: Locator;

  constructor(page: Page) {
    this.firstName = page.getByLabel('First Name');
    this.lastName = page.getByLabel('Last Name');
    this.street = page.getByLabel('Street Address: Line 1');
    this.city = page.getByLabel('City');
    this.region = page.getByLabel('State/Province');
    this.postcode = page.getByLabel('Zip/Postal Code');
    this.country = page.getByLabel('Country');
    this.phone = page.getByLabel('Phone Number');
  }

  async fill(a: Address): Promise<void> {
    await this.firstName.fill(a.firstName);
    await this.lastName.fill(a.lastName);
    await this.street.fill(a.street);
    await this.country.selectOption({ label: a.country });
    await this.city.fill(a.city);
    if (await this.region.isVisible()) await this.region.selectOption({ label: a.region });
    await this.postcode.fill(a.postcode);
    await this.phone.fill(a.phone);
  }
}
