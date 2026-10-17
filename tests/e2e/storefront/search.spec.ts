import { test, expect } from '../../../src/fixtures';
import { Tags } from '../../../src/utils/tags';
import { TestData } from '../../../src/data/TestData';

for (const row of TestData.searchTerms()) {
  test(`search "${row.term}" ${row.expectResults === 'true' ? 'returns' : 'does not return'} products`,
    { tag: [Tags.smoke, Tags.regression] }, async ({ homePage, searchPage }) => {
      await homePage.open();
      await homePage.header.search(row.term);
      if (row.expectResults === 'true') await expect(searchPage.items.first()).toBeVisible();
      else await expect(searchPage.noResults).toBeVisible();
    });
}
