import { Page, Locator } from '@playwright/test';
import { MiniCart } from './MiniCart';

export class Header {
  readonly searchBox: Locator;
  readonly signInLink: Locator;
  readonly miniCart: MiniCart;

  constructor(page: Page) {
    this.searchBox = page.getByRole('combobox', { name: /search/i });
    this.signInLink = page.getByRole('link', { name: /sign in/i }).first();
    this.miniCart = new MiniCart(page);
  }

  async search(term: string): Promise<void> {
    await this.searchBox.fill(term);
    await this.searchBox.press('Enter');
  }
}
