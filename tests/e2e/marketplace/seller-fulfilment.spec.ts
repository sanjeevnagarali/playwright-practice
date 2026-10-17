import { test, expect } from '@playwright/test';
import { SellerLoginPage } from '../../../src/pages/marketplace/SellerLoginPage';
import { SellerOrdersPage } from '../../../src/pages/marketplace/SellerOrdersPage';
import { Tags } from '../../../src/utils/tags';
import { secret } from '../../../config/env.config';

// Requires an order id seeded for the seller (see test-data); set SEED_ORDER_ID.
test('seller can mark an order as shipped', { tag: [Tags.marketplace, Tags.regression] }, async ({ page }) => {
  const orderId = process.env.SEED_ORDER_ID;
  test.skip(!orderId, 'SEED_ORDER_ID not provided (no fabricated data)');
  const login = new SellerLoginPage(page);
  await login.open();
  await login.login(secret('SELLER_EMAIL'), secret('SELLER_PASSWORD'));
  const orders = new SellerOrdersPage(page);
  await orders.open();
  await orders.markShipped(orderId as string);
  await expect(orders.orderRow(orderId as string)).toContainText(/shipped/i);
});
