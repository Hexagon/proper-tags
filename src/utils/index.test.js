import { test } from 'uvu';
import * as assert from 'uvu/assert';

import * as utils from './index.js';
import { flat } from './flat/index.js';
import { prefixLines } from './prefixLines/index.js';
import { stripLastNewLine } from './stripLastNewLine/index.js';
import { toString } from './toString/index.js';

test('exports flat', () => {
  assert.equal(utils.flat, flat);
});

test('exports prefixLines', () => {
  assert.equal(utils.prefixLines, prefixLines);
});

test('exports stripLastNewLine', () => {
  assert.equal(utils.stripLastNewLine, stripLastNewLine);
});

test('exports toString', () => {
  assert.equal(utils.toString, toString);
});

test.run();