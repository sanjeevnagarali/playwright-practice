import { test, expect } from '../../src/fixtures';
import { Tags } from '../../src/utils/tags';
import { failThirdParty } from '../../src/integrations/mocks/ThirdPartyMocks';

test('storefront stays usable when the tax service is down', { tag: [Tags.integration, Tags.regression] },
  async ({ page, homePage }) => {
    await failThirdParty(page, '**/tax-service/**');
    await homePage.open();
    await expect(homePage.header.searchBox).toBeVisible();
  });
