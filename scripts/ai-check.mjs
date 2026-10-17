#!/usr/bin/env node
// Executable CLAUDE.md: checks framework rules on the repo (or on files passed as args).
// Usage: node scripts/ai-check.mjs [--json] [file ...]
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const only = args.filter((a) => !a.startsWith('--')).map((f) => path.resolve(f));

const walk = (dir) =>
  !fs.existsSync(dir) ? [] : fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });

const rel = (f) => path.relative(process.cwd(), f).split(path.sep).join('/');
const inScope = (f) => only.length === 0 || only.includes(f);
const specs = walk('tests').filter((f) => f.endsWith('.spec.ts') && inScope(path.resolve(f)));
const pages = walk('src/pages').filter((f) => f.endsWith('.ts') && inScope(path.resolve(f)));
const srcTs = [...walk('src'), ...walk('tests')].filter((f) => f.endsWith('.ts') && inScope(path.resolve(f)));

const violations = [];
const add = (rule, file, line, msg) => violations.push({ rule, file: rel(file), line, message: msg });
const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

for (const f of specs) {
  const t = fs.readFileSync(f, 'utf-8');
  const re = (rx, rule, msg) => { for (const m of t.matchAll(rx)) add(rule, f, lineOf(t, m.index), msg); };

  re(/\bpage\s*\.\s*(locator|getBy\w+)\s*\(/g, 'R-01', 'Raw locator in spec; move it into a page object');
  re(/(\/\/[^'"\n]*['"`]|['"`])\s*\/\/[a-z*]/gi, 'R-03', 'XPath selector; use role/label/test-id');
  re(/waitForTimeout\s*\(/g, 'R-05', 'Fixed wait; use web-first assertions');
  re(/\btest\.only\b|\bdescribe\.only\b/g, 'R-09', 'test.only must not be committed');
  re(/describe\.serial|describe\.configure\(\s*\{\s*mode:\s*'serial'/g, 'R-10', 'Serial tests create order dependencies');
  re(/(password|secret|token)\s*[:=]\s*['"][^'"]{4,}['"]/gi, 'R-08', 'Hard-coded credential; use env vars via config/env.config.ts');
  re(/expect\(\s*await\s+[\w.]+\.(isVisible|isHidden|isChecked|isEnabled)\(/g, 'R-04', 'Use web-first assertion: expect(locator).toBeVisible()');

  for (const m of t.matchAll(/\btest(?:\.fixme)?\(\s*[`'"]/g)) {
    const chunk = t.slice(m.index, m.index + 600).split(/=>\s*\{|async\s*\(/)[0];
    if (!/tag\s*:|trace\(/.test(chunk)) add('R-06', f, lineOf(t, m.index), 'Test has no tag (@smoke/@regression/@api/...)');
  }

  const ticket = path.basename(f).match(/^([A-Z][A-Z0-9]+-\d+)-/);
  if (ticket) {
    if (!/trace\(\s*['"]/.test(t)) add('R-07', f, 1, `Spec for ${ticket[1]} must use trace('${ticket[1]}','TC-xx')`);
    const plan = `test-plans/${ticket[1]}.md`;
    if (!fs.existsSync(plan)) add('R-07', f, 1, `No test plan at ${plan}`);
    else if (!/^status:\s*approved/im.test(fs.readFileSync(plan, 'utf-8'))) add('R-07', f, 1, `${plan} is not Status: Approved (Gate 1)`);
  }
}

for (const f of pages) {
  const t = fs.readFileSync(f, 'utf-8');
  if (/class\s+\w+\s*(?!extends)/.test(t) && !/extends\s+BasePage/.test(t)) add('R-02', f, 1, 'Page class must extend BasePage');
  for (const m of t.matchAll(/waitForTimeout\s*\(/g)) add('R-05', f, lineOf(t, m.index), 'Fixed wait in page object');
  for (const m of t.matchAll(/locator\(\s*['"`]\/\/|xpath=/g)) add('R-03', f, lineOf(t, m.index), 'XPath locator');
}

for (const f of srcTs) {
  const t = fs.readFileSync(f, 'utf-8');
  for (const m of t.matchAll(/@anthropic-ai|api\.anthropic\.com/g)) add('R-13', f, lineOf(t, m.index), 'No AI calls in test runtime code');
}

if (asJson) console.log(JSON.stringify({ ok: violations.length === 0, violations }, null, 2));
else if (violations.length === 0) console.log(`ai-check: OK (${specs.length} specs, ${pages.length} pages)`);
else {
  console.error(`ai-check: ${violations.length} violation(s)`);
  for (const v of violations) console.error(`  [${v.rule}] ${v.file}:${v.line}  ${v.message}`);
}
process.exit(violations.length ? 1 : 0);
