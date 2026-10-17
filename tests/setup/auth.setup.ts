import { test as setup } from '@playwright/test';
import { LoginPage } from '../../src/pages/storefront/LoginPage';
import { AuthState } from '../../src/fixtures';
import { secret } from '../../config/env.config';

setup('authenticate customer', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login(secret('CUSTOMER_EMAIL'), secret('CUSTOMER_PASSWORD'));
  await login.expectLoggedIn();
  await page.context().storageState({ path: AuthState.customer });
});
