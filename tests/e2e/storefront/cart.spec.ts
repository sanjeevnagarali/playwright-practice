import { test, expect } from '../../../src/fixtures';
import { Tags } from '../../../src/utils/tags';
import { TestData } from '../../../src/data/TestData';

test.describe('Cart', () => {
  test('add a product from the PDP updates the mini-cart', { tag: [Tags.smoke, Tags.regression] }, async ({ homePage, searchPage, pdpPage }) => {
    const p = TestData.products().simple;
    await homePage.open();
    await homePage.header.search(p.name);
    await searchPage.card(0).open();
    await pdpPage.add(p.qty);
    await homePage.header.miniCart.expectCount(p.qty);
  });

  test('remove the only item shows the empty cart message', { tag: [Tags.regression] }, async ({ homePage, searchPage, pdpPage, cartPage }) => {
    const p = TestData.products().simple;
    await homePage.open();
    await homePage.header.search(p.name);
    await searchPage.card(0).open();
    await pdpPage.add();
    await cartPage.open();
    await cartPage.removeItem();
    await expect(cartPage.empty).toBeVisible();
  });
});
