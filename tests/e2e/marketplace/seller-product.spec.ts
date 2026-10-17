import { test } from '@playwright/test';
import { SellerLoginPage } from '../../../src/pages/marketplace/SellerLoginPage';
import { SellerDashboardPage } from '../../../src/pages/marketplace/SellerDashboardPage';
import { SellerProductPage } from '../../../src/pages/marketplace/SellerProductPage';
import { Tags } from '../../../src/utils/tags';
import { secret } from '../../../config/env.config';

test('seller can create a product', { tag: [Tags.marketplace, Tags.regression] }, async ({ page }) => {
  const login = new SellerLoginPage(page);
  await login.open();
  await login.login(secret('SELLER_EMAIL'), secret('SELLER_PASSWORD'));
  await new SellerDashboardPage(page).expectVisible();
  const sku = `AUTO-${Date.now()}`;
  await new SellerProductPage(page).open();
  await new SellerProductPage(page).create(`Auto Product ${sku}`, sku, 19.99);
});
