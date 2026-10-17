import { Page } from '@playwright/test';
import { IframeCardAdapter } from './PaymentAdapter';

export class StripeAdapter extends IframeCardAdapter {
  readonly name = 'stripe';
  protected frame(page: Page) { return page.frameLocator('iframe[title*="Secure payment"]').first(); }
  protected fields(f: ReturnType<StripeAdapter['frame']>) {
    return { number: f.getByLabel(/card number/i), expiry: f.getByLabel(/expiration/i), cvc: f.getByLabel(/security code/i) };
  }
}
