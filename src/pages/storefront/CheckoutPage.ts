import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { AddressForm } from '../../components/AddressForm';

export class CheckoutPage extends BasePage {
  protected readonly path = '/checkout/';
  readonly address: AddressForm;
  readonly guestEmail: Locator; readonly shippingMethod: Locator; readonly next: Locator;
  readonly placeOrder: Locator; readonly orderTotal: Locator; readonly paymentError: Locator;

  constructor(page: Page) {
    super(page);
    this.address = new AddressForm(page);
    this.guestEmail = page.locator('#customer-email');
    this.shippingMethod = page.getByRole('radio').first();
    this.next = page.getByRole('button', { name: 'Next' });
    this.placeOrder = page.getByRole('button', { name: 'Place Order' });
    this.orderTotal = page.locator('.grand.totals .price');
    this.paymentError = page.getByRole('alert');
  }

  async waitUntilLoaded(): Promise<void> { await expect(this.page.getByRole('heading', { name: /shipping address/i })).toBeVisible(); }

  async chooseShippingAndContinue(): Promise<void> {
    await this.shippingMethod.check();
    await this.next.click();
    await expect(this.placeOrder).toBeVisible();
  }
}
