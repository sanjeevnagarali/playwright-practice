import { Page } from '@playwright/test';
import { CartPage } from '../pages/storefront/CartPage';
import { CheckoutPage } from '../pages/storefront/CheckoutPage';
import { OrderConfirmationPage } from '../pages/storefront/OrderConfirmationPage';
import { Address, PaymentCard } from '../data/models';
import { paymentAdapter } from '../integrations/payments';

/** Business flow composed from page objects; specs call this, never raw locators. */
export class CheckoutFlow {
  constructor(private readonly page: Page) {}

  async placeOrder(address: Address, card: PaymentCard, guestEmail?: string): Promise<string> {
    const cart = new CartPage(this.page);
    const checkout = new CheckoutPage(this.page);
    await cart.open();
    await cart.checkout.click();
    await checkout.waitUntilLoaded();
    if (guestEmail) await checkout.guestEmail.fill(guestEmail);
    await checkout.address.fill(address);
    await checkout.chooseShippingAndContinue();
    await paymentAdapter().pay(this.page, card);
    await checkout.placeOrder.click();
    return new OrderConfirmationPage(this.page).expectPlaced();
  }
}
