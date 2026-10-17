import { ApiClient } from '../ApiClient';

/** Adobe Commerce token endpoints. */
export class AuthService {
  constructor(private readonly api: ApiClient) {}

  customerToken(email: string, password: string): Promise<string> {
    return this.api.post<string>('integration/customer/token', { username: email, password });
  }

  adminToken(username: string, password: string): Promise<string> {
    return this.api.post<string>('integration/admin/token', { username, password });
  }
}
