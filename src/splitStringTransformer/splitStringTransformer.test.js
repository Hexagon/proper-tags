import { createTag } from '../createTag.js';
import { inlineArrayTransformer } from '../inlineArrayTransformer.js';
import { splitStringTransformer } from './splitStringTransformer.js';

test('splits a string substitution into an array by the specified character', () => {
  const tag = createTag(splitStringTransformer('\n'), inlineArrayTransformer());
  assert.equal(tag`foo ${'bar\nbaz'}`, 'foo bar baz');
});

test('ignores string if splitBy character is not found', () => {
  const tag = createTag(splitStringTransformer('.'));
  assert.equal(tag`foo ${'bar,baz'}`, 'foo bar,baz');
});

test('ignores substitution if it is not a string', () => {
  const tag = createTag(splitStringTransformer(''));
  assert.equal(tag`foo ${5}`, 'foo 5');
});

test('throws an error if splitBy param is undefined', () => {
  assert.equal(() => {
    splitStringTransformer();
  }).toThrow(/specify a string character to split by/);
});

test('throws an error if splitBy param is not a string', () => {
  assert.equal(() => {
    splitStringTransformer(42);
  }).toThrow(/specify a string character to split by/);
});
