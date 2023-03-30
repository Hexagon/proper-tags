import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as sinon from 'sinon';

/* Recreate __dirname */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { TemplateTag } from './index.js';

/* eslint-disable no-console */

test.before.each(() => {
  console.warn = sinon.spy();
});

test('a warning should be printed the first time a TemplateTag is constructed', () => {
  assert.equal(console.warn.notCalled,true);

  new TemplateTag();

  assert.equal(console.warn.called, true);
  assert.equal(console.warn.calledWith(sinon.match('Use createTag instead')),true);

  new TemplateTag();

  assert.equal(console.warn.called, true);
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
  assert.equal(data,{
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

test.run();