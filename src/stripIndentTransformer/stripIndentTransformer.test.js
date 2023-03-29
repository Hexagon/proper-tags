import createTag from '../createTag';
import stripIndentTransformer from './stripIndentTransformer';
import trimResultTransformer from '../trimResultTransformer';
import { readFromFixture } from '../testUtils';

test('default behaviour removes the leading indent, but preserves the rest', () => {
  const stripIndent = createTag(
    stripIndentTransformer(),
    trimResultTransformer('smart'),
  );
  const expected = readFromFixture(__dirname, 'stripIndent');
  const actual = stripIndent`
    foo bar baz
    bar baz foo
      baz foo bar
        wow such doge
  `;
  assert.equal(actual, expected);
});

test('type "initial" does not remove indents if there is no need to do so', () => {
  const stripIndent = createTag(
    stripIndentTransformer(),
    trimResultTransformer('smart'),
  );
  assert.equal(stripIndent``, '');
  assert.equal(stripIndent`foo`, 'foo');
  assert.equal(stripIndent`foo\nbar`, 'foo\nbar');
});

test('removes all indents if type is "all"', () => {
  const stripIndents = createTag(
    stripIndentTransformer('all'),
    trimResultTransformer('smart'),
  );
  const expected = readFromFixture(__dirname, 'stripIndents');
  const actual = stripIndents`
    foo bar baz
    bar baz foo
      baz foo bar
        wow such doge
  `;
  assert.equal(actual, expected);
});

test('throws an error if encounters invalid type', () => {
  assert.equal(() => {
    stripIndentTransformer('blue');
  }).toThrow(/not supported/);
});
