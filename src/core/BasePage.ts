import { Page, expect } from '@playwright/test';

export abstract class BasePage {
  /** Relative path used by open(). */
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async open(): Promise<this> {
    await this.page.goto(this.path);
    await this.waitUntilLoaded();
    return this;
  }

  /** Override with a page-specific readiness check (web-first, no fixed waits). */
  async waitUntilLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectUrl(pattern: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern);
  }
}
