import test from 'node:test';
import assert from 'node:assert/strict';

import { fmt, gc } from '../js/utils/format.js';

test('fmt rounds to integer and groups with French NBSP', () => {
  const formatted = fmt(1234567.49);
  // Intl.NumberFormat('fr-FR') uses U+202F (narrow no-break space) as thousands separator.
  assert.equal(formatted.replace(/\s/g, ''), '1234567');
});

test('fmt rounds to the nearest integer (Math.round)', () => {
  assert.equal(fmt(0.5).replace(/\s/g, ''),  '1');
  assert.equal(fmt(1.4).replace(/\s/g, ''),  '1');
  assert.equal(fmt(-1.5).replace(/\s/g, ''), '-1');
});

test('gc returns "negative" for negative numbers', () => {
  assert.equal(gc(-1), 'negative');
  assert.equal(gc(-0.01), 'negative');
});

test('gc returns "positive" for positive numbers', () => {
  assert.equal(gc(1), 'positive');
  assert.equal(gc(0.01), 'positive');
});

test('gc returns "neutral" for zero', () => {
  assert.equal(gc(0), 'neutral');
});
