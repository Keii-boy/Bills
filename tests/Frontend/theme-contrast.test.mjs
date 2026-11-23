import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const css = readFileSync(new URL('../../resources/css/app.css', import.meta.url), 'utf8');
const themeTokens = Object.fromEntries(
    [...css.matchAll(/(?:^|\n)(:root|\.dark)\s*\{([^}]+)\}/g)].map(([, selector, block]) => [
        selector,
        Object.fromEntries([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()])),
    ]),
);

function luminance(tokens, name) {
    const value = tokens[name];
    assert.ok(value, `Missing color token ${name}`);

    if (value.startsWith('var(--')) {
        return luminance(tokens, value.slice(6, -1));
    }

    assert.match(value, /^#[\da-f]{6}$/i, `${name} should resolve to a six-digit color`);
    const channels = value
        .slice(1)
        .match(/../g)
        .map((channel) => Number.parseInt(channel, 16) / 255);
    const [red, green, blue] = channels.map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));

    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

const textPairs = [
    ['foreground', 'background'],
    ['card-foreground', 'card'],
    ['popover-foreground', 'popover'],
    ['muted-foreground', 'background'],
    ['muted-foreground', 'card'],
    ['muted-foreground', 'muted'],
    ['primary-foreground', 'primary'],
    ['primary-foreground', 'primary-hover'],
    ['secondary-foreground', 'secondary'],
    ['accent-foreground', 'accent'],
    ['sidebar-foreground', 'sidebar-background'],
    ['sidebar-primary-foreground', 'sidebar-primary'],
    ['sidebar-accent-foreground', 'sidebar-accent'],
    ['destructive-foreground', 'destructive'],
    ['destructive-foreground', 'destructive-hover'],
    ['destructive', 'background'],
    ['destructive', 'card'],
    ['income', 'card'],
    ['expense', 'card'],
];

const controlPairs = [
    ['input', 'card'],
    ['input', 'background'],
    ['ring', 'background'],
    ['ring', 'card'],
    ['ring', 'muted'],
    ['ring', 'popover'],
    ['sidebar-ring', 'sidebar-background'],
];

function assertContrast(tokens, pairs, minimum) {
    for (const [foreground, background] of pairs) {
        const first = luminance(tokens, foreground);
        const second = luminance(tokens, background);
        const ratio = (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);

        assert.ok(ratio >= minimum, `${foreground} on ${background} has ${ratio.toFixed(2)}:1 contrast, below ${minimum}:1`);
    }
}

test('light theme colors meet AA contrast targets for text and controls', () => {
    assert.ok(themeTokens[':root']);
    assertContrast(themeTokens[':root'], textPairs, 4.5);
    assertContrast(themeTokens[':root'], controlPairs, 3);
});

test('dark theme colors meet AA contrast targets for text and controls', () => {
    assert.ok(themeTokens['.dark']);
    const darkTokens = { ...themeTokens[':root'], ...themeTokens['.dark'] };
    assertContrast(darkTokens, textPairs, 4.5);
    assertContrast(darkTokens, controlPairs, 3);
});
