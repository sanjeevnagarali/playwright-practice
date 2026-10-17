export const Tags = {
  smoke: '@smoke',
  regression: '@regression',
  api: '@api',
  integration: '@integration',
  marketplace: '@marketplace',
  b2b: '@b2b',
  mobile: '@mobile',
  crossBrowser: '@cross-browser',
  readOnlySafe: '@prod-safe'
} as const;

export const ticketTag = (id: string): string => `@${id}`;
