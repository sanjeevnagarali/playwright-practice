import { ApiClient } from '../ApiClient';
import { Product } from '../../data/models';

export class CartService {
  constructor(private readonly api: ApiClient) {}

  createGuestCart(): Promise<string> { return this.api.post<string>('guest-carts'); }

  addItem(cartId: string, p: Product) {
    return this.api.post<{ item_id: number; sku: string; qty: number }>(`guest-carts/${cartId}/items`, {
      cartItem: { quote_id: cartId, sku: p.sku, qty: p.qty }
    });
  }

  totals(cartId: string) {
    return this.api.get<{ grand_total: number; items_qty: number }>(`guest-carts/${cartId}/totals`);
  }
}
