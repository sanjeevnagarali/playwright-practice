import { Page } from '@playwright/test';
import { DataReader } from '../../data/DataReader';

interface MockData { tax: { rate: number }; shipping: { flat: number } }

/** Stubs tax / shipping / fraud calls so tests are deterministic when MOCK_THIRD_PARTY=true. */
export async function mockThirdParties(page: Page): Promise<void> {
  const data = DataReader.json<MockData>('mocks/third-party.json');

  await page.route('**/rest/**/estimate-shipping-methods', (route) =>
    route.fulfill({ json: [{ carrier_code: 'flatrate', method_code: 'flatrate', carrier_title: 'Flat Rate', method_title: 'Fixed', amount: data.shipping.flat, available: true }] })
  );
  await page.route('**/tax-service/**', (route) => route.fulfill({ json: { rate: data.tax.rate } }));
  await page.route('**/fraud-service/**', (route) => route.fulfill({ json: { score: 0, decision: 'accept' } }));
}

/** Simulates a 3rd-party outage for resilience tests. */
export async function failThirdParty(page: Page, pattern: string, status = 503): Promise<void> {
  await page.route(pattern, (route) => route.fulfill({ status, body: 'Service Unavailable' }));
}
