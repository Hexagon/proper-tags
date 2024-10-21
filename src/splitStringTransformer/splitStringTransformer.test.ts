import { test } from "uvu";
import * as assert from "uvu/assert";

import { createTag } from "../createTag/index.js";
import { inlineArrayTransformer } from "../inlineArrayTransformer/index.ts";
import { splitStringTransformer } from "./splitStringTransformer.ts";

test("splits a string substitution into an array by the specified character", () => {
  const tag = createTag(splitStringTransformer("\n"), inlineArrayTransformer());
  assert.equal(tag`foo ${"bar\nbaz"}`, "foo bar baz");
});

test("ignores string if splitBy character is not found", () => {
  const tag = createTag(splitStringTransformer("."));
  assert.equal(tag`foo ${"bar,baz"}`, "foo bar,baz");
});

test("ignores substitution if it is not a string", () => {
  const tag = createTag(splitStringTransformer(""));
  assert.equal(tag`foo ${5}`, "foo 5");
});

test("throws an error if splitBy param is undefined", () => {
  assert.throws(() => {
    splitStringTransformer();
  }, /specify a string character to split by/);
});

test("throws an error if splitBy param is not a string", () => {
  assert.throws(() => {
    splitStringTransformer(42);
  }, /specify a string character to split by/);
});

test.run();
