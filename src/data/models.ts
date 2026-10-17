export interface Address {
  firstName: string; lastName: string; street: string; city: string;
  region: string; postcode: string; country: string; phone: string;
}
export interface Product { sku: string; name: string; qty: number; }
export interface Customer { email: string; password: string; firstName: string; lastName: string; }
export interface PaymentCard { number: string; expiry: string; cvc: string; }
export interface PracticeLoginData { invalidUsername: string; invalidPassword: string; }
