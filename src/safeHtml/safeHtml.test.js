import safeHtml from './safeHtml';
import { readFromFixture } from '../testUtils';

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
