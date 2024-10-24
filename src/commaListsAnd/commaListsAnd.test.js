import { test } from 'uvu';
import * as assert from 'uvu/assert';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { commaListsAnd } from './commaListsAnd.js';
import { readFromFixture } from '../testUtils/index.js';

const val = 'amaze';

test('includes arrays as comma-separated list with "and"', () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = readFromFixture(__dirname, 'commaListsAnd');
  const actual = commaListsAnd`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  assert.equal(actual, expected);
});

test('only returns the first item of a single element array', () => {
  const fruits = ['apple'];
  const expected = readFromFixture(__dirname, 'commaListsAndSingleItem');
  const actual = commaListsAnd`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  assert.equal(actual, expected);
});

test.run()