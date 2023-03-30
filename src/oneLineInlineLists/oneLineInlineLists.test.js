import { test } from 'uvu';
import * as assert from 'uvu/assert';

/* Recreate __dirname */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { oneLineInlineLists } from './oneLineInlineLists.js';
import { readFromFixture } from '../testUtils/index.js';

const val = 'amaze';

test('includes arrays as inline list on one line', () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = readFromFixture(__dirname, 'oneLineInlineLists').trim();
  const actual = oneLineInlineLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  assert.equal(actual, expected);
});

test.run();