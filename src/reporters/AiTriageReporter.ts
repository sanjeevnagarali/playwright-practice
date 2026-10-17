import { stripVTControlCharacters } from 'util';
import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';

interface Failure {
  title: string; file: string; project: string; tags: string[]; trace: string[];
  error: string; retry: number; attachments: string[];
}

/** Writes a compact failure digest for humans and for Claude triage (test-results/ai-triage/). */
export default class AiTriageReporter implements Reporter {
  private failures: Failure[] = [];

  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === 'passed' || result.status === 'skipped') return;
    this.failures.push({
      title: test.titlePath().slice(2).join(' > '),
      file: path.relative(process.cwd(), test.location.file) + ':' + test.location.line,
      project: test.parent.project()?.name ?? '',
      tags: test.tags,
      trace: test.annotations.filter((a) => a.type === 'trace').map((a) => a.description ?? ''),
      error: stripVTControlCharacters(result.error?.message ?? '').slice(0, 1500),
      retry: result.retry,
      attachments: result.attachments.filter((a) => a.path).map((a) => path.relative(process.cwd(), a.path as string))
    });
  }

  onEnd(): void {
    if (!this.failures.length) return;
    const dir = path.resolve('test-results', 'ai-triage');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'failures.json'), JSON.stringify(this.failures, null, 2));
    const md = ['# Failure digest', '', `${this.failures.length} failing attempt(s)`, ''];
    for (const f of this.failures) {
      md.push(`## ${f.title}`, `- file: ${f.file}`, `- project: ${f.project} (retry ${f.retry})`, `- trace: ${f.trace.join(', ') || 'n/a'}`,
        `- tags: ${f.tags.join(' ')}`, '', '```', f.error, '```', ...f.attachments.map((a) => `- attachment: ${a}`), '');
    }
    fs.writeFileSync(path.join(dir, 'failures.md'), md.join('\n'));
  }
}
