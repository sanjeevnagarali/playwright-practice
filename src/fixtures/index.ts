import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/storefront/HomePage';
import { LoginPage } from '../pages/storefront/LoginPage';
import { RegistrationPage } from '../pages/storefront/RegistrationPage';
import { SearchResultsPage } from '../pages/storefront/SearchResultsPage';
import { PdpPage } from '../pages/storefront/PdpPage';
import { CartPage } from '../pages/storefront/CartPage';
import { CheckoutPage } from '../pages/storefront/CheckoutPage';
import { OrderConfirmationPage } from '../pages/storefront/OrderConfirmationPage';
import { CheckoutFlow } from '../flows/CheckoutFlow';
import { ApiClient } from '../api/ApiClient';
import { AuthService } from '../api/services/AuthService';
import { CartService } from '../api/services/CartService';
import { ProductService } from '../api/services/ProductService';
import { OrderService } from '../api/services/OrderService';
import { mockThirdParties } from '../integrations/mocks/ThirdPartyMocks';
import { mockThirdParty, env } from '../../config/env.config';

type Pages = {
  homePage: HomePage; loginPage: LoginPage; registrationPage: RegistrationPage;
  searchPage: SearchResultsPage; pdpPage: PdpPage; cartPage: CartPage;
  checkoutPage: CheckoutPage; confirmationPage: OrderConfirmationPage; checkoutFlow: CheckoutFlow;
};

export const test = base.extend<Pages & { autoMocks: void }>({
  autoMocks: [async ({ page }, use) => { if (mockThirdParty) await mockThirdParties(page); await use(); }, { auto: true }],
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  registrationPage: async ({ page }, use) => use(new RegistrationPage(page)),
  searchPage: async ({ page }, use) => use(new SearchResultsPage(page)),
  pdpPage: async ({ page }, use) => use(new PdpPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  confirmationPage: async ({ page }, use) => use(new OrderConfirmationPage(page)),
  checkoutFlow: async ({ page }, use) => use(new CheckoutFlow(page))
});

type Services = { api: ApiClient; auth: AuthService; carts: CartService; products: ProductService; orders: OrderService };

/** API-only tests: no browser, platform REST client with services. */
export const apiTest = base.extend<Services>({
  api: async ({ playwright }, use) => {
    const ctx = await playwright.request.newContext({ baseURL: env.apiUrl.endsWith('/') ? env.apiUrl : env.apiUrl + '/' });
    await use(new ApiClient(ctx));
    await ctx.dispose();
  },
  auth: async ({ api }, use) => use(new AuthService(api)),
  carts: async ({ api }, use) => use(new CartService(api)),
  products: async ({ api }, use) => use(new ProductService(api)),
  orders: async ({ api }, use) => use(new OrderService(api))
});

export { expect };

export const AuthState = { customer: '.auth/customer.json', seller: '.auth/seller.json' } as const;
