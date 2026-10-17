import { test } from '../../../src/fixtures';
import { Tags } from '../../../src/utils/tags';
import { DataFactory } from '../../../src/data/DataFactory';
import { expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

test('new customer can register', { tag: [Tags.regression] }, async ({ registrationPage, page }) => {
  await registrationPage.open();
  await registrationPage.register(DataFactory.customer());
  await expect(page).toHaveURL(/customer\/account/);
});
