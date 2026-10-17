import { Page } from '@playwright/test';
import { IframeCardAdapter } from './PaymentAdapter';

export class BraintreeAdapter extends IframeCardAdapter {
  readonly name = 'braintree';
  protected frame(page: Page) { return page.frameLocator('iframe[name^="braintree-hosted-field"]').first(); }
  protected fields(f: ReturnType<BraintreeAdapter['frame']>) {
    return { number: f.getByLabel(/credit card number/i), expiry: f.getByLabel(/expiration/i), cvc: f.getByLabel(/cvv|security/i) };
  }
}
