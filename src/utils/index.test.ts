import { test } from "uvu";
import * as assert from "uvu/assert";

import * as fs from "fs";
import path from "path";
import mm from "micromatch";

/* Recreate __dirname */
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const observe = ["*", "!index.ts", "!index.test.ts"];

const context = {};

test.before.each(() => {
  context.modules = mm(fs.readdirSync(__dirname), observe);
});

function requireModule(module) {
  return require(path.join(__dirname, module));
}
/*
ToDo: Need to be converted to uvu
test('utils exports all the right modules directly', () => {
  const modules = context.modules;
  modules.forEach((module) => {
    assert.equal(requireModule(module)).toBeDefined();
  });
});

test('utils exports all the right modules as props', () => {
  const modules = context.modules;
  modules.forEach((module) => {
    assert.equal(require('./index')).toHaveProperty(module, requireModule(module));
  });
});*/

test.run();
