import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export interface EnvConfig {
  name: string;
  baseUrl: string;
  apiUrl: string;
  sellerPortalUrl: string;
  paymentProvider: 'stripe' | 'adyen' | 'braintree' | 'paypal';
  readOnly: boolean;
  features: Record<string, boolean>;
}

export function loadEnv(): EnvConfig {
  const name = process.env.TEST_ENV ?? 'qa';
  const file = path.join(__dirname, 'environments', `${name}.json`);
  if (!fs.existsSync(file)) throw new Error(`Unknown TEST_ENV "${name}" (no ${file})`);
  const cfg = JSON.parse(fs.readFileSync(file, 'utf-8')) as EnvConfig;
  if (process.env.PAYMENT_PROVIDER) cfg.paymentProvider = process.env.PAYMENT_PROVIDER as EnvConfig['paymentProvider'];
  return cfg;
}

export const env = loadEnv();

export function secret(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing required env var ${key} (see .env.example)`);
  return v;
}

export const mockThirdParty = process.env.MOCK_THIRD_PARTY === 'true';
