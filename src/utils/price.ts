/** Parses "$1,234.50" / "₹1,234.50" / "1.234,50 €" into a number. */
export function parsePrice(text: string): number {
  const cleaned = text.replace(/[^\d.,-]/g, '');
  const lastComma = cleaned.lastIndexOf(',');
  const lastDot = cleaned.lastIndexOf('.');
  const normalised =
    lastComma > lastDot ? cleaned.replace(/\./g, '').replace(',', '.') : cleaned.replace(/,/g, '');
  const value = Number(normalised);
  if (Number.isNaN(value)) throw new Error(`Cannot parse price from "${text}"`);
  return value;
}

export const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;
