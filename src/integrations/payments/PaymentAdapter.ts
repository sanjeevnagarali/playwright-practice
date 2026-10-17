import { Page, FrameLocator } from '@playwright/test';
import { PaymentCard } from '../../data/models';

export interface PaymentAdapter {
  readonly name: string;
  pay(page: Page, card: PaymentCard): Promise<void>;
}

/** Shared helper for card-in-iframe gateways. */
export abstract class IframeCardAdapter implements PaymentAdapter {
  abstract readonly name: string;
  protected abstract frame(page: Page): FrameLocator;
  protected abstract fields(frame: FrameLocator): { number: ReturnType<FrameLocator['getByLabel']>; expiry: ReturnType<FrameLocator['getByLabel']>; cvc: ReturnType<FrameLocator['getByLabel']> };

  async pay(page: Page, card: PaymentCard): Promise<void> {
    const f = this.fields(this.frame(page));
    await f.number.fill(card.number);
    await f.expiry.fill(card.expiry);
    await f.cvc.fill(card.cvc);
  }
}
