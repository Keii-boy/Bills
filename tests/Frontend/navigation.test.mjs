import assert from 'node:assert/strict';
import test from 'node:test';
import { getNavigationMatch } from '../../resources/js/lib/navigation.ts';

test('marks the current page and ignores query strings, hashes, and trailing slashes', () => {
    assert.equal(getNavigationMatch('/accounts/?sort=name#list', '/accounts'), 'page');
    assert.equal(getNavigationMatch('/dashboard', '/dashboard'), 'page');
});

test('keeps Accounts active on create and detail pages', () => {
    assert.equal(getNavigationMatch('/accounts/create', '/accounts', true), 'location');
    assert.equal(getNavigationMatch('/accounts/42?from=list', '/accounts', true), 'location');
});

test('matches only whole path segments and requires child matching to be enabled', () => {
    assert.equal(getNavigationMatch('/accounts-help', '/accounts', true), undefined);
    assert.equal(getNavigationMatch('/accounts/42', '/accounts'), undefined);
    assert.equal(getNavigationMatch('/accounts/42', '/', true), undefined);
});
