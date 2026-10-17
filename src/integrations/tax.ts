import { round2 } from '../utils/price';

/** Expected-tax helper for mocked tax scenarios (rate from test-data/mocks/third-party.json). */
export const expectedTax = (subtotal: number, rate: number): number => round2(subtotal * rate);
