import createTag from '../createTag';
import stripIndentTransformer from '../stripIndentTransformer';
import trimResultTransformer from './trimResultTransformer';

test('trims outer padding', () => {
  const trim = createTag(trimResultTransformer());
  assert.equal(trim`  foo  `, 'foo');
});

test('trims start padding', () => {
  const trimStart = createTag(trimResultTransformer('start'));
  assert.equal(trimStart`  foo  `, 'foo  ');
});

test('trims left padding', () => {
  const trimLeft = createTag(trimResultTransformer('left'));
  assert.equal(trimLeft`  foo  `, 'foo  ');
});

test('trims end padding', () => {
  const trimEnd = createTag(trimResultTransformer('end'));
  assert.equal(trimEnd`  foo  `, '  foo');
});

test('trims right padding', () => {
  const trimRight = createTag(trimResultTransformer('right'));
  assert.equal(trimRight`  foo  `, '  foo');
});

test('can be used sequentially', () => {
  const trimStart = createTag(
    stripIndentTransformer(),
    trimResultTransformer('start'),
  );
  assert.equal(trimStart`  foo  `, 'foo  ');
  assert.equal(trimStart`  bar  `, 'bar  ');
});

describe('smart trimming', () => {
  const trimSmart = createTag(trimResultTransformer('smart'));

  test('leaves a string without surrounding whitespace as-is', () => {
    assert.equal(trimSmart`a`, 'a');
  });

  test('performs an end-side trim on a single-line string', () => {
    assert.equal(trimSmart`  a  `, '  a');
  });

  test('trims whitespace at the end of each line', () => {
    assert.equal(trimSmart`a  \n  b  \nc  `, 'a\n  b\nc');
  });

  test("removes the first line if it's empty", () => {
    assert.equal(trimSmart`  \na`, 'a');
  });

  test('leaves the trailing newline character', () => {
    assert.equal(trimSmart`a  \n`, 'a\n');
  });

  test("doesn't remove intentional newline characters", () => {
    assert.equal(trimSmart`a\n  \n`, 'a\n\n');
  });
});

test('throws an error if invalid side supplied', () => {
  assert.equal(() => {
    trimResultTransformer('up');
  }).toThrow(/not supported/);
});
