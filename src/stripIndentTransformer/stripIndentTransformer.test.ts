import { test } from "uvu";
import * as assert from "uvu/assert";

/* Recreate __dirname */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createTag } from "../createTag/index.js";
import { stripIndentTransformer } from "./stripIndentTransformer.ts";
import { trimResultTransformer } from "../trimResultTransformer/index.js";
import { readFromFixture } from "../testUtils/index.js";

test("default behaviour removes the leading indent, but preserves the rest", () => {
  const stripIndent = createTag(
    stripIndentTransformer(),
    trimResultTransformer("smart"),
  );
  const expected = readFromFixture(__dirname, "stripIndent");
  const actual = stripIndent`
    foo bar baz
    bar baz foo
      baz foo bar
        wow such doge
  `;
  assert.equal(actual, expected);
});

test('type "initial" does not remove indents if there is no need to do so', () => {
  const stripIndent = createTag(
    stripIndentTransformer(),
    trimResultTransformer("smart"),
  );
  assert.equal(stripIndent``, "");
  assert.equal(stripIndent`foo`, "foo");
  assert.equal(stripIndent`foo\nbar`, "foo\nbar");
});

test('removes all indents if type is "all"', () => {
  const stripIndents = createTag(
    stripIndentTransformer("all"),
    trimResultTransformer("smart"),
  );
  const expected = readFromFixture(__dirname, "stripIndents");
  const actual = stripIndents`
    foo bar baz
    bar baz foo
      baz foo bar
        wow such doge
  `;
  assert.equal(actual, expected);
});

test("throws an error if encounters invalid type", () => {
  assert.throws(() => {
    stripIndentTransformer("blue");
  }, /not supported/);
});

test.run();
