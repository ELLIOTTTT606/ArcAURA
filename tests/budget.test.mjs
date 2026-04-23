import test from 'node:test';
import assert from 'node:assert/strict';

import { generateData20Years, calculateAggregates } from '../src/js/pages/budget.js';

test('generateData20Years produces 240 months (20 years * 12)', () => {
  const data = generateData20Years();
  assert.equal(data.length, 240);
});

test('months are contiguous from 0 to 239', () => {
  const data = generateData20Years();
  data.forEach((row, i) => assert.equal(row.month, i));
});

test('years go from 1 through 20', () => {
  const data = generateData20Years();
  const years = new Set(data.map(r => r.year));
  for (let y = 1; y <= 20; y++) assert.ok(years.has(y), `missing year ${y}`);
});

test('phases cover all documented labels', () => {
  const data = generateData20Years();
  const phases = new Set(data.map(r => r.phase));
  ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'].forEach(p =>
    assert.ok(phases.has(p), `missing phase ${p}`),
  );
});

test('calculateAggregates adds totalRev, totalOpex, netRevenue, cumul', () => {
  const data = calculateAggregates(generateData20Years());
  const sample = data[0];
  for (const key of ['totalRev', 'totalOpex', 'netRevenue', 'cumul']) {
    assert.ok(key in sample, `missing ${key}`);
  }
});

test('cumul is a running sum of netRevenue', () => {
  const data = calculateAggregates(generateData20Years());
  let running = 0;
  for (const row of data) {
    running += row.netRevenue;
    assert.equal(row.cumul, running);
  }
});

test('final cumul equals sum of all netRevenue values', () => {
  const data = calculateAggregates(generateData20Years());
  const total = data.reduce((s, r) => s + r.netRevenue, 0);
  assert.equal(data[data.length - 1].cumul, total);
});
