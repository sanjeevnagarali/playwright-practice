import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class ApiClient {
  constructor(private readonly request: APIRequestContext, private token?: string) {}

  setToken(token: string): void { this.token = token; }

  private headers(): Record<string, string> {
    return { 'Content-Type': 'application/json', ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}) };
  }

  async get<T>(url: string, expectedStatus = 200): Promise<T> {
    return this.unwrap<T>(await this.request.get(url, { headers: this.headers() }), expectedStatus);
  }

  async post<T>(url: string, data?: unknown, expectedStatus = 200): Promise<T> {
    return this.unwrap<T>(await this.request.post(url, { headers: this.headers(), data }), expectedStatus);
  }

  async put<T>(url: string, data?: unknown, expectedStatus = 200): Promise<T> {
    return this.unwrap<T>(await this.request.put(url, { headers: this.headers(), data }), expectedStatus);
  }

  private async unwrap<T>(res: APIResponse, expectedStatus: number): Promise<T> {
    expect(res.status(), `${res.url()} -> ${await res.text()}`).toBe(expectedStatus);
    const text = await res.text();
    return (text ? JSON.parse(text) : undefined) as T;
  }
}
