import replaceStringTransformer from './replaceStringTransformer';
import createTag from '../createTag';

test('only operates on strings', () => {
  const tag = createTag(
    replaceStringTransformer(/</g, '&lt;'),
    replaceStringTransformer(/>/g, '&gt;'),
  );
  assert.equal(tag`<h1>foo${'<bar></bar>'}</h1>`, 
    '&lt;h1&gt;foo<bar></bar>&lt;/h1&gt;',
  );
});

test('throws error if no arguments are supplied', () => {
  assert.equal(() => {
    replaceStringTransformer();
  }).toThrow(/requires exactly 2 arguments/);
});
