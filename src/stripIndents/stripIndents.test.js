import { test } from 'uvu';
import * as assert from 'uvu/assert';

/* Recreate __dirname */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { stripIndents } from './stripIndents.js';
import { readFromFixture } from '../testUtils/index.js';

const val = 'amaze';

test('strips all indentation', () => {
  const expected = readFromFixture(__dirname, 'stripIndents');
  const actual = stripIndents`
    wow such indent gone
      very ${val}
        foo bar baz
  `;
  assert.equal(actual, expected);
});

test('maintains empty lines', () => {
  const expected = readFromFixture(__dirname, 'maintainEmptyLines');
  const actual = stripIndents`
    wow such indent gone
      very ${val}

        foo bar baz
  `;
  assert.equal(actual, expected);
});

test.run();