import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env.config';

const isCI = !!process.env.CI;
const authFile = '.auth/customer.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 4 : undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['./src/reporters/AiTriageReporter.ts']
  ],
  use: {
    baseURL: env.baseUrl,
    testIdAttribute: 'data-testid',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'storefront-chromium',
      testDir: './tests/e2e/storefront',
      use: { ...devices['Desktop Chrome'], storageState: authFile },
      dependencies: ['setup']
    },
    {
      name: 'storefront-firefox',
      testDir: './tests/e2e/storefront',
      grep: /@cross-browser/,
      use: { ...devices['Desktop Firefox'], storageState: authFile },
      dependencies: ['setup']
    },
    {
      name: 'storefront-webkit',
      testDir: './tests/e2e/storefront',
      grep: /@cross-browser/,
      use: { ...devices['Desktop Safari'], storageState: authFile },
      dependencies: ['setup']
    },
    {
      name: 'storefront-mobile',
      testDir: './tests/e2e/storefront',
      grep: /@mobile/,
      use: { ...devices['Pixel 7'], storageState: authFile },
      dependencies: ['setup']
    },
    {
      name: 'marketplace',
      testDir: './tests/e2e/marketplace',
      use: { ...devices['Desktop Chrome'], baseURL: env.sellerPortalUrl }
    },
    // Practice Test Automation site: standalone, no storefront auth setup
    { name: 'practice', testDir: './tests/e2e/practice', use: { ...devices['Desktop Chrome'] } },
    { name: 'integration', testDir: './tests/integration', use: { ...devices['Desktop Chrome'] } },
    { name: 'api', testDir: './tests/api', use: { baseURL: env.apiUrl } }
  ]
});
