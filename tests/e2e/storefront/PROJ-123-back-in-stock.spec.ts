import { test, expect } from '../../../src/fixtures';
import { Tags } from '../../../src/utils/tags';
import { trace } from '../../../src/utils/traceability';
import { TestData } from '../../../src/data/TestData';

// Plan: test-plans/PROJ-123.md (approved)
test.describe('PROJ-123 Back-in-stock notification', () => {
  test('out-of-stock PDP offers Notify Me', trace('PROJ-123', 'TC-01', [Tags.smoke, Tags.regression]), async ({ pdpPage }) => {
    await pdpPage.openBySlug('sold-out-item');
    await expect(pdpPage.stockStatus).toContainText(/out of stock/i);
    await expect(pdpPage.notifyMe).toBeVisible();
    await expect(pdpPage.addToCart).toBeHidden();
  });

  test('in-stock PDP does not offer Notify Me', trace('PROJ-123', 'TC-02', [Tags.regression]), async ({ pdpPage }) => {
    const p = TestData.products().simple;
    await pdpPage.openBySlug(p.name.toLowerCase().replace(/\s+/g, '-'));
    await expect(pdpPage.notifyMe).toBeHidden();
    await expect(pdpPage.addToCart).toBeVisible();
  });
});
