import inlineLists from './inlineLists';
import { readFromFixture } from '../testUtils';

const val = 'amaze';

test('includes arrays as space-separated list', () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = readFromFixture(__dirname, 'inlineLists');
  const actual = inlineLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  assert.equal(actual, expected);
});
