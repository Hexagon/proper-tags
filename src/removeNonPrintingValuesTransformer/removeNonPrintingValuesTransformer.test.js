import createTag from '../createTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import removeNonPrintingValuesTransformer from '../removeNonPrintingValuesTransformer';

test('removes null', () => {
  const remove = createTag(removeNonPrintingValuesTransformer());
  const nil = null;
  assert.equal(remove`a${nil}z`, 'az');
});

test('removes bool', () => {
  const remove = createTag(removeNonPrintingValuesTransformer());
  const yep = true;
  const nope = false;
  assert.equal(remove`a${yep}${nope}z`, 'az');
});

test('removes NaN', () => {
  const remove = createTag(removeNonPrintingValuesTransformer());
  const nan = 0 / 0;
  assert.equal(remove`a${nan}z`, 'az');
});

test('removes non-printing array values', () => {
  const remove = createTag(
    removeNonPrintingValuesTransformer(),
    inlineArrayTransformer(),
  );
  const val = ['foo', undefined, 'bar', null];
  assert.equal(remove`a ${val} z`, 'a foo bar z');
});
