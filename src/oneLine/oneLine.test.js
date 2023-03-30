import { test } from 'uvu';
import * as assert from 'uvu/assert';

/* Recreate __dirname */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { oneLine } from './oneLine.js';
import { readFromFixture } from '../testUtils/index.js';

const val = 'amaze';

test('reduces text to one line, replacing newlines with spaces', () => {
  const expected = readFromFixture(__dirname, 'oneLine').trim();
  const actual = oneLine`
    wow such doge
    is very ${val}
    at one line neat
    from multiline
  `;
  assert.equal(actual, expected);
});

test('reduces text to one line, replacing newlines with spaces (no indentation)', () => {
  const expected = readFromFixture(__dirname, 'oneLine').trim();
  const actual = oneLine`
wow such doge
is very ${val}
at one line neat

from multiline
  `;
  assert.equal(actual, expected);
});

test('preserves whitespace within input lines, replacing only newlines', () => {
  const expected = readFromFixture(__dirname, 'oneLine-sentence').trim();
  const actual = oneLine`
    Sentences also work.  Double
    spacing is preserved.
  `;
  assert.equal(actual, expected);
});

test.run()