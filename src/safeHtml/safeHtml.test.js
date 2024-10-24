import { test } from 'uvu';
import * as assert from 'uvu/assert';

/* Recreate __dirname */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { safeHtml } from './safeHtml.js';
import { readFromFixture } from '../testUtils/index.js';

const val = 'amaze';

test('renders HTML, including arrays', () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = readFromFixture(__dirname, 'normal-html');
  const actual = safeHtml`
    <h1>${val}</h1>
    <ul>
      ${fruits.map((fruit) => `${fruit}`)}
    </ul>
  `;
  assert.equal(actual, expected);
});

test('converts strings containing newlines into proper indented output', () => {
  const newlines = 'one\ntwo';
  const expected = readFromFixture(__dirname, 'newline-conversion');
  const actual = safeHtml`
    <h1>${val}</h1>
    <ul>
      ${newlines}
      <li>three</li>
    </ul>
  `;
  assert.equal(actual, expected);
});

test('correctly escapes HTML tags on substitution', () => {
  const fruits = ['apple', 'banana', 'kiwi', '<h1>dangerous fruit</h1>'];
  const expected = readFromFixture(__dirname, 'escaped-html');
  const actual = safeHtml`
    <h1>${val}</h1>
    <ul>
      ${fruits.map((fruit) => `${fruit}`)}
    </ul>
  `;
  assert.equal(actual, expected);
});

test.run();