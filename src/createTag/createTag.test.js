import { test, suite } from 'uvu';
import * as assert from 'uvu/assert';
import * as sinon from 'sinon';

/* Recreate __dirname */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createTag } from './index.js';

test('does no processing by default', () => {
  const tag = createTag();
  assert.equal(tag`foo`, 'foo');
});

test('transformer methods are optional', () => {
  const noMethods = createTag({});
  const noSubNorEnd = createTag({
    onString(str) {
      return str.toUpperCase();
    },
  });
  const noStringNorSub = createTag({
    onEndResult(endResult) {
      return endResult.toUpperCase();
    },
  });
  const noStringNorEnd = createTag({
    onSubstitution(sub) {
      return sub.split('').reverse().join('');
    },
  });
  assert.equal(noMethods`foo`,'foo');
  assert.equal(noSubNorEnd`foo ${'bar'} baz`, 'FOO bar BAZ');
  assert.equal(noStringNorSub`bar`, 'BAR');
  assert.equal(noStringNorEnd`foo ${'bar'}`, 'foo rab');
});

test('calls hooks with an additional context argument', () => {
  const tag = createTag({
    getInitialContext() {
      return { strings: [], subs: [] };
    },
    onString(str, context) {
      context.strings.push(str);
      return str;
    },
    onSubstitution(substitution, resultSoFar, context) {
      context.subs.push({ substitution, resultSoFar });
      return substitution;
    },
    onEndResult(endResult, context) {
      context.endResult = endResult.toUpperCase();
      return context;
    },
  });
  const data = tag`foo ${'bar'} baz ${'fizz'}`;
  assert.equal(data, {
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

test('each transformer has its own context', () => {
  let defaultContext;
  const transformerWithDefaultContext = {
    onString(str, context) {
      context.onStringCalled = true;
    },
    onSubstitution(substitution, resultSoFar, context) {
      context.onSubstitutionCalled = true;
    },
    onEndResult(endResult, context) {
      context.onEndResultCalled = true;
      defaultContext = context;
    },
  };

  const context1 = {};
  const transformerWithContext1 = {
    getInitialContext() {
      return context1;
    },
    onString(str, context) {
      context.onStringCalled = true;
    },
    onSubstitution(substitution, resultSoFar, context) {
      context.onSubstitutionCalled = true;
    },
    onEndResult(endResult, context) {
      context.onEndResultCalled = true;
    },
  };

  const context2 = {};
  const transformerWithContext2 = {
    getInitialContext() {
      return context2;
    },
    onString(str, context) {
      context.onStringCalled = true;
    },
    onSubstitution(substitution, resultSoFar, context) {
      context.onSubstitutionCalled = true;
    },
    onEndResult(endResult, context) {
      context.onEndResultCalled = true;
    },
  };

  const tag = createTag(
    transformerWithDefaultContext,
    transformerWithContext1,
    transformerWithContext2,
  );

  tag`foo${42}`;

  assert.equal(defaultContext, {
    onStringCalled: true,
    onSubstitutionCalled: true,
    onEndResultCalled: true,
  });
  assert.equal(context1, {
    onStringCalled: true,
    onSubstitutionCalled: true,
    onEndResultCalled: true,
  });
  assert.equal(context2, {
    onStringCalled: true,
    onSubstitutionCalled: true,
    onEndResultCalled: true,
  });
});

test('calls the "init" hook each time the tag is called', () => {
  const getInitialContext = sinon.spy();
  const tag = createTag({ getInitialContext });

  tag`foo`;
  tag`foo`;

  assert.equal(getInitialContext.callCount,2);
});

test("doesn't handle function arguments specially", () => {
  const plugin = () => ({
    onEndResult(endResult) {
      return endResult.toUpperCase();
    },
  });
  const invalidTag = createTag(plugin);
  assert.equal(invalidTag`foo bar`, 'foo bar');

  const properTag = createTag(plugin());
  assert.equal(properTag`foo bar`, 'FOO BAR');
});

test('supports pipeline of transformers as both argument list and as array', () => {
  const transform1 = {
    onSubstitution(substitution) {
      return substitution.replace('foo', 'doge');
    },
  };
  const transform2 = {
    onEndResult(endResult) {
      return endResult.toUpperCase();
    },
  };
  const argumentListTag = createTag(transform1, transform2);
  const arrayTag = createTag([transform1, transform2]);
  assert.equal(argumentListTag`wow ${'foo'}`, 'WOW DOGE');
  assert.equal(arrayTag`bow ${'foo'}`, 'BOW DOGE');
});

test('supports tail processing of another tag if first argument to tag is a tag', () => {
  const tag = createTag({
    onEndResult(endResult) {
      return endResult.toUpperCase().trim();
    },
  });
  const raw = tag(String.raw)`
    foo bar
    ${500}
  `;
  assert.equal(raw, 'FOO BAR\n    500');
});

test('has the correct order when tail processing', () => {
  const upperCaseTag = createTag({
    onEndResult(endResult) {
      assert.equal(endResult, 'foo bar\n    500');
      return endResult.toUpperCase();
    },
  });
  const trimTag = createTag({
    onEndResult(endResult) {
      assert.equal(endResult, '\n    foo bar\n    500\n  ');
      return endResult.trim();
    },
  });
  const raw = upperCaseTag(trimTag)`
    foo bar
    ${500}
  `;
  assert.equal(raw, 'FOO BAR\n    500');
});

suite('supports using the tag as a plain function', () => {
  test('with a string', () => {
    let onStringCalls = 0;
    let onSubstitutionCalls = 0;
    let onEndResultCalls = 0;
    const tag = createTag({
      onString(string) {
        onStringCalls += 1;
        return string.toUpperCase();
      },
      onSubstitution() {
        onSubstitutionCalls += 1;
      },
      onEndResult(endResult) {
        onEndResultCalls += 1;
        return endResult.trim();
      },
    });
    const raw = tag(`
      foo bar
      ${500}
    `);
    assert.equal(raw, 'FOO BAR\n      500');
    assert.equal(onStringCalls, 1);
    assert.equal(onSubstitutionCalls, 0);
    assert.equal(onEndResultCalls, 1);
  });

  test('with a number', () => {
    let onSubstitutionCalls = 0;
    const tag = createTag({
      onSubstitution() {
        onSubstitutionCalls += 1;
      },
      onEndResult(endResult) {
        return String(endResult);
      },
    });
    const raw = tag(42);
    assert.equal(raw, '42');
    assert.equal(onSubstitutionCalls, 0);
  });

  test.run();
});
/*
ToDo: Need to be converted to uvu
test('transforms substitutions to string as per spec', () => {
  const get = jest
    .fn()
    .mockImplementationOnce((target, prop) => {
      assert.equal(prop, Symbol.toPrimitive);
    })
    .mockImplementationOnce((target, prop) => {
      assert.equal(prop, 'toString');
    })
    .mockImplementationOnce((target, prop) => {
      assert.equal(prop, 'valueOf');
      return () => 42;
    });

  const val = new Proxy({}, { get });
  const tag = createTag();
  const result = tag`foo ${val} bar`;

  assert.equal(get).toHaveBeenCalledTimes(3);
  assert.equal(result, 'foo 42 bar');
});*/

test('accepts other tags as arguments and applies them in order', () => {
  const tag1 = createTag({
    onEndResult(string) {
      return string + '1';
    },
  });
  const tag2 = createTag({
    onEndResult(string) {
      return string + '2';
    },
  });
  const tag3 = createTag({
    onEndResult(string) {
      return string + '3';
    },
  });
  const superTag = createTag(tag1, createTag(tag2, tag3), {
    onEndResult(string) {
      return string + '4';
    },
  });

  assert.equal(superTag`foo`, 'foo1234');
});

test.run();
suite();