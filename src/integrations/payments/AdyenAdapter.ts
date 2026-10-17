import { Page } from '@playwright/test';
import { IframeCardAdapter } from './PaymentAdapter';

export class AdyenAdapter extends IframeCardAdapter {
  readonly name = 'adyen';
  protected frame(page: Page) { return page.frameLocator('iframe[title*="card"]').first(); }
  protected fields(f: ReturnType<AdyenAdapter['frame']>) {
    return { number: f.getByLabel(/card number/i), expiry: f.getByLabel(/expiry date/i), cvc: f.getByLabel(/security code/i) };
  }
}
