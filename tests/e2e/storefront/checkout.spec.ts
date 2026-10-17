import { test } from '../../../src/fixtures';
import { Tags } from '../../../src/utils/tags';
import { TestData } from '../../../src/data/TestData';
import { DataFactory } from '../../../src/data/DataFactory';

test('registered customer completes checkout with a valid card', { tag: [Tags.smoke, Tags.regression] },
  async ({ homePage, searchPage, pdpPage, checkoutFlow }) => {
    const p = TestData.products().simple;
    await homePage.open();
    await homePage.header.search(p.name);
    await searchPage.card(0).open();
    await pdpPage.add();
    const orderNo = await checkoutFlow.placeOrder(DataFactory.address(), TestData.cards().valid);
    test.info().annotations.push({ type: 'order', description: orderNo });
  });
