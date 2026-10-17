import { Page } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { Header } from '../../components/Header';

export class HomePage extends BasePage {
  protected readonly path = '/';
  readonly header: Header;
  constructor(page: Page) { super(page); this.header = new Header(page); }
}
