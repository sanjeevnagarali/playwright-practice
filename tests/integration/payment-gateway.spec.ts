import { test, expect } from '../../src/fixtures';
import { Tags } from '../../src/utils/tags';
import { TestData } from '../../src/data/TestData';
import { DataFactory } from '../../src/data/DataFactory';
import { paymentAdapter } from '../../src/integrations/payments';
import { secret } from '../../config/env.config';

test('declined card keeps the shopper on payment step', { tag: [Tags.integration, Tags.regression] },
  async ({ loginPage, searchPage, homePage, pdpPage, cartPage, checkoutPage, page }) => {
    await loginPage.open();
    await loginPage.login(secret('CUSTOMER_EMAIL'), secret('CUSTOMER_PASSWORD'));
    await homePage.open();
    await homePage.header.search(TestData.products().simple.name);
    await searchPage.card(0).open();
    await pdpPage.add();
    await cartPage.open();
    await cartPage.checkout.click();
    await checkoutPage.waitUntilLoaded();
    await checkoutPage.address.fill(DataFactory.address());
    await checkoutPage.chooseShippingAndContinue();
    await paymentAdapter().pay(page, TestData.cards().declined);
    await checkoutPage.placeOrder.click();
    await expect(checkoutPage.paymentError).toContainText(/declined|failed|try again/i);
  });
