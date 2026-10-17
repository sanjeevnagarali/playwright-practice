import { PaymentAdapter } from './PaymentAdapter';
import { StripeAdapter } from './StripeAdapter';
import { AdyenAdapter } from './AdyenAdapter';
import { BraintreeAdapter } from './BraintreeAdapter';
import { PayPalAdapter } from './PayPalAdapter';
import { env } from '../../../config/env.config';

export function paymentAdapter(provider: string = env.paymentProvider): PaymentAdapter {
  switch (provider) {
    case 'stripe': return new StripeAdapter();
    case 'adyen': return new AdyenAdapter();
    case 'braintree': return new BraintreeAdapter();
    case 'paypal': return new PayPalAdapter();
    default: throw new Error(`Unsupported payment provider "${provider}"`);
  }
}
