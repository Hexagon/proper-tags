import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { source } from './index.js';
import { html } from '../html/index.js';

test('is an alias for html', () => {
  assert.equal(source, html);
});

test('renders HTML like html tag', () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const actual = source`
    <ul>
      ${fruits.map((fruit) => `<li>${fruit}</li>`)}
    </ul>
  `;
  const expected = html`
    <ul>
      ${fruits.map((fruit) => `<li>${fruit}</li>`)}
    </ul>
  `;
  assert.equal(actual, expected);
});

test.run();
