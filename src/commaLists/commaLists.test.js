import * as commaLists from './commaLists.js';
import { readFromFixture } from '../testUtils.js';

const val = 'amaze';

test('includes arrays as comma-separated list', () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = readFromFixture(__dirname, 'commaLists');
  const actual = commaLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});
