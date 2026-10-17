import { Page } from '@playwright/test';
import { PaymentAdapter } from './PaymentAdapter';
import { secret } from '../../../config/env.config';

/** PayPal sandbox popup flow. Card argument is unused (wallet payment). */
export class PayPalAdapter implements PaymentAdapter {
  readonly name = 'paypal';

  async pay(page: Page): Promise<void> {
    const popupPromise = page.waitForEvent('popup');
    await page.frameLocator('iframe[title*="PayPal"]').first().getByRole('link', { name: /paypal/i }).click();
    const popup = await popupPromise;
    await popup.getByLabel(/email/i).fill(secret('PAYPAL_SANDBOX_EMAIL'));
    await popup.getByRole('button', { name: /next/i }).click();
    await popup.getByLabel(/password/i).fill(secret('PAYPAL_SANDBOX_PASSWORD'));
    await popup.getByRole('button', { name: /log in/i }).click();
    await popup.getByRole('button', { name: /complete purchase|continue|pay now/i }).click();
  }
}
