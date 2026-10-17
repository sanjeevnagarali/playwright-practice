import fs from 'fs';
import path from 'path';

type Row = Record<string, string>;

export class DataReader {
  static json<T>(file: string): T {
    return JSON.parse(fs.readFileSync(path.resolve('test-data', file), 'utf-8')) as T;
  }

  /** Minimal CSV reader (header row, comma separated, no quoted commas). */
  static csv(file: string): Row[] {
    const [head, ...lines] = fs.readFileSync(path.resolve('test-data', file), 'utf-8').trim().split(/\r?\n/);
    const keys = head.split(',').map((k) => k.trim());
    return lines.filter(Boolean).map((l) => {
      const cells = l.split(',').map((c) => c.trim());
      return Object.fromEntries(keys.map((k, i) => [k, cells[i] ?? ''])) as Row;
    });
  }

  /** Excel reading needs the optional "xlsx" package: npm i -D xlsx, then implement here. */
  static excel(): never {
    throw new Error('Excel reader not enabled. Install "xlsx" and implement DataReader.excel (see docs/FRAMEWORK_GUIDE.md).');
  }
}
