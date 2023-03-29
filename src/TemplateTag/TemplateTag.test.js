import TemplateTag from '../TemplateTag';

/* eslint-disable no-console */

beforeEach(() => {
  console.warn = jest.fn();
});

test('a warning should be printed the first time a TemplateTag is constructed', () => {
  assert.equal(console.warn).toHaveBeenCalledTimes(0);

  new TemplateTag();

  assert.equal(console.warn).toHaveBeenCalledTimes(1);
  assert.equal(console.warn).toHaveBeenCalledWith(
    expect.stringContaining('Use createTag instead'),
  );

  new TemplateTag();

  assert.equal(console.warn).toHaveBeenCalledTimes(1);
});

/* eslint-enable no-console */

test('performs a transformation & provides correct values to transform methods', () => {
  const tag = new TemplateTag({
    onString(str) {
      this.ctx = this.ctx || { strings: [], subs: [] };
      this.ctx.strings.push(str);
      return str;
    },
    onSubstitution(substitution, resultSoFar) {
      this.ctx.subs.push({ substitution, resultSoFar });
      return substitution;
    },
    onEndResult(endResult) {
      this.ctx.endResult = endResult.toUpperCase();
      return this.ctx;
    },
  });
  const data = tag`foo ${'bar'} baz ${'fizz'}`;
  assert.equal(data).toEqual({
    endResult: 'FOO BAR BAZ FIZZ',
    strings: ['foo ', ' baz ', ''],
    subs: [
      {
        substitution: 'bar',
        resultSoFar: 'foo ',
      },
      {
        substitution: 'fizz',
        resultSoFar: 'foo bar baz ',
      },
    ],
  });
});
