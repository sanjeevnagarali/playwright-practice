import { ApiClient } from '../ApiClient';

export class ProductService {
  constructor(private readonly api: ApiClient) {}
  bySku(sku: string) { return this.api.get<{ sku: string; name: string; price: number; status: number }>(`products/${encodeURIComponent(sku)}`); }
  stock(sku: string) { return this.api.get<{ qty: number; is_in_stock: boolean }>(`stockItems/${encodeURIComponent(sku)}`); }
}
