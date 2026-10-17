import { expect } from '@playwright/test';
import { ApiClient } from '../api/ApiClient';

/** Verifies a product is indexed in the storefront search backend (Elasticsearch/OpenSearch/Algolia proxy via platform API). */
export async function expectIndexed(api: ApiClient, term: string, sku: string): Promise<void> {
  await expect
    .poll(async () => {
      const r = await api.get<{ items: { sku: string }[] }>(
        `products?searchCriteria[filterGroups][0][filters][0][field]=name&searchCriteria[filterGroups][0][filters][0][value]=%25${encodeURIComponent(term)}%25&searchCriteria[filterGroups][0][filters][0][conditionType]=like`
      );
      return r.items.some((i) => i.sku === sku);
    }, { timeout: 60_000, message: `${sku} should be searchable by "${term}"` })
    .toBe(true);
}
