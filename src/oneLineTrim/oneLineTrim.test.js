import { test } from 'uvu';
import * as assert from 'uvu/assert';

/* Recreate __dirname */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { oneLineTrim } from './oneLineTrim.js';
import { readFromFixture } from '../testUtils/index.js';

const val = 'amaze';

test('reduces to one line while trimming newlines', () => {
  const expected = readFromFixture(__dirname, 'oneLineTrim').trim();
  const actual = oneLineTrim`
  wow such reduction
  very absence of space
  much ${val}
  `;
  assert.equal(actual, expected);
});

test('reduces to one line while trimming newlines (no indentation)', () => {
  const expected = readFromFixture(__dirname, 'oneLineTrim').trim();
  const actual = oneLineTrim`
wow such reduction
very absence of space
much ${val}
  `;
  assert.equal(actual, expected);
});

test.run();