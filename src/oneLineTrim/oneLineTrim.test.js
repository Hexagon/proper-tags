import oneLineTrim from './oneLineTrim';
import { readFromFixture } from '../testUtils';

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
