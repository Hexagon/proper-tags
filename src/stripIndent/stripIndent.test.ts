import { test } from "uvu";
import * as assert from "uvu/assert";

/* Recreate __dirname */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { stripIndent } from "./stripIndent.ts";
import { readFromFixture } from "../testUtils/index.js";

const val = "amaze";

test("strips indentation", () => {
  const expected = readFromFixture(__dirname, "stripIndent");
  const actual = stripIndent`
    wow such indent gone
    very ${val}
  `;
  assert.equal(actual, expected);
});

test("strips larger indentation", () => {
  const expected = readFromFixture(__dirname, "stripIndent");
  const actual = stripIndent`
      wow such indent gone
      very ${val}
  `;
  assert.equal(actual, expected);
});

test("maintains deeper indentation", () => {
  const expected = readFromFixture(__dirname, "maintainIndent");
  const actual = stripIndent`
    wow such indent gone
        very ${val}
  `;
  assert.equal(actual, expected);
});

test("maintains empty lines", () => {
  const expected = readFromFixture(__dirname, "maintainEmptyLines");
  const actual = stripIndent`
    wow such indent gone

        very ${val}
  `;
  assert.equal(actual, expected);
});

test("does nothing if there are no indents", () => {
  const expected = "wow such doge";
  const actual = stripIndent`wow such doge`;
  assert.equal(actual, expected);
});

test("does nothing if minimal indent has zero length", () => {
  const expected = "wow\n such\n doge";
  const actual = stripIndent`wow\n such\n doge`;
  assert.equal(actual, expected);
});

test.run();
