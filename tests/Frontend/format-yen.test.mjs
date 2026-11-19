import assert from 'node:assert/strict';
import test from 'node:test';
import { formatYen } from '../../resources/js/lib/format-yen.ts';

test('displays whole-yen strings with a currency symbol and digit grouping', () => {
    assert.equal(formatYen('10000'), '¥10,000');
    assert.equal(formatYen('0'), '¥0');
    assert.equal(formatYen('-1200'), '-¥1,200');
});

test('keeps every digit when displaying an amount beyond JavaScript safe integers', () => {
    assert.equal(formatYen('9007199254740993'), '¥9,007,199,254,740,993');
});
