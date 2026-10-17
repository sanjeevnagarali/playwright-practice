import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { ProductCard } from '../../components/ProductCard';

export class SearchResultsPage extends BasePage {
  protected readonly path = '/catalogsearch/result/';
  readonly items: Locator; readonly noResults: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.locator('.product-item');
    this.noResults = page.getByText(/your search returned no results/i);
  }

  card(index = 0): ProductCard { return new ProductCard(this.items.nth(index)); }
}
