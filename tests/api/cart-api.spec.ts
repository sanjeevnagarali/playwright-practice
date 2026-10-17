import { apiTest as test, expect } from '../../src/fixtures';
import { Tags } from '../../src/utils/tags';
import { TestData } from '../../src/data/TestData';

test('guest cart totals reflect added item', { tag: [Tags.api, Tags.smoke, Tags.regression] }, async ({ carts }) => {
  const p = TestData.products().simple;
  const cartId = await carts.createGuestCart();
  await carts.addItem(cartId, p);
  const totals = await carts.totals(cartId);
  expect(totals.items_qty).toBe(p.qty);
  expect(totals.grand_total).toBeGreaterThan(0);
});
