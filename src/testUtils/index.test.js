import { test } from 'uvu';
import * as assert from 'uvu/assert';

/* Recreate __dirname */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import * as fs from 'fs';
import mm from 'micromatch';
/*
ToDo: Need to be converted to uvu
const observe = ['*', '!index.js', '!index.test.js'];

const context = {};

test.before.each(() => {
  context.modules = mm(fs.readdirSync(__dirname), observe);
});

function requireModule(module) {
  return require(path.join(__dirname, module));
}

test('test utils exports all the right modules directly', () => {
  const modules = context.modules;
  //expect.assertions(modules.length);
  modules.forEach((module) => {
    assert.equal(requireModule(module) !== undefined, true);
  });
});

test('test utils exports all the right modules as props', () => {
  const modules = context.modules;
  expect.assertions(modules.length);
  modules.forEach((module) => {
    assert.equal(require('./index')).toHaveProperty(module, requireModule(module));
  });
});
*/

test.run();