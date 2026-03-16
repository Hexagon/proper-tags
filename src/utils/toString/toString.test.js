import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { toString } from './toString.js';

test('converts a number to a string', () => {
  assert.equal(toString(42), '42');
});

test('converts a boolean to a string', () => {
  assert.equal(toString(true), 'true');
  assert.equal(toString(false), 'false');
});

test('converts null to a string', () => {
  assert.equal(toString(null), 'null');
});

test('converts undefined to a string', () => {
  assert.equal(toString(undefined), 'undefined');
});

test('uses Symbol.toPrimitive, then toString, then valueOf for coercion', () => {
  const calls = [];
  const val = new Proxy(
    {},
    {
      get(target, prop) {
        calls.push(prop);
        if (prop === 'valueOf') {
          return () => 42;
        }
      },
    },
  );

  const result = toString(val);

  assert.equal(result, '42');
  assert.equal(calls[0], Symbol.toPrimitive);
  assert.equal(calls[1], 'toString');
  assert.equal(calls[2], 'valueOf');
});

test.run();
