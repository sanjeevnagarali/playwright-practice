import { test, expect } from '@playwright/test';
import { Tags } from '../../src/utils/tags';
import { EmailInbox } from '../../src/integrations/email';

// Requires an order placed to ORDER_EMAIL (a Mailosaur address) earlier in the run/seed.
test('order confirmation email is delivered', { tag: [Tags.integration] }, async () => {
  const to = process.env.ORDER_EMAIL;
  test.skip(!to || !process.env.MAILOSAUR_API_KEY, 'ORDER_EMAIL / MAILOSAUR_API_KEY not provided');
  const msg = await new EmailInbox().waitForMessage(to as string, 'order');
  expect(msg.subject).toMatch(/order/i);
});
