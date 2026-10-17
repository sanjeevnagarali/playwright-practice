import { ApiClient } from '../ApiClient';

export class OrderService {
  constructor(private readonly api: ApiClient) {}
  byIncrementId(incrementId: string) {
    return this.api.get<{ items: { increment_id: string; status: string; grand_total: number }[] }>(
      `orders?searchCriteria[filterGroups][0][filters][0][field]=increment_id&searchCriteria[filterGroups][0][filters][0][value]=${incrementId}`
    );
  }
}
