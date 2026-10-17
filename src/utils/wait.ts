import { expect } from '@playwright/test';

/** Retry an async check until it returns the expected value (no fixed sleeps). */
export async function pollUntil<T>(fn: () => Promise<T>, expected: T, timeout = 30_000, message = 'pollUntil'): Promise<void> {
  await expect.poll(fn, { timeout, message }).toEqual(expected);
}
