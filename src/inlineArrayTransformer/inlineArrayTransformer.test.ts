import { test } from "uvu";
import * as assert from "uvu/assert";

import { inlineArrayTransformer } from "./inlineArrayTransformer.ts";
import { createTag } from "../createTag/createTag.ts";

test("only operates on arrays", () => {
  const tag = createTag(inlineArrayTransformer);
  assert.equal(tag`foo ${5} ${"bar"}`, "foo 5 bar");
});

test("includes an array as a comma-separated list", () => {
  const tag = createTag(inlineArrayTransformer({ separator: "," }));
  assert.equal(
    tag`I like ${["apple", "banana", "kiwi"]}`,
    "I like apple, banana, kiwi",
  );
});

test("replaces last separator with a conjunction", () => {
  const tag = createTag(
    inlineArrayTransformer({ separator: ",", conjunction: "and" }),
  );
  assert.equal(
    tag`I like ${["apple", "banana", "kiwi"]}`,
    "I like apple, banana and kiwi",
  );
});

test("replaces last separator with a conjunction", () => {
  const tag = createTag(
    inlineArrayTransformer({ separator: ",", conjunction: "and" }),
  );
  assert.equal(
    tag`I like ${["apple", "banana", 'a fruit that has "," in the name']}`,
    'I like apple, banana and a fruit that has "," in the name',
  );
});

test("does not use a conjunction if there is only one item in an array", () => {
  const tag = createTag(
    inlineArrayTransformer({ separator: ",", conjunction: "and" }),
  );
  assert.equal(tag`I like ${["apple"]}`, "I like apple");
});

test("does not require preceded whitespace", () => {
  const tag = createTag(inlineArrayTransformer({ separator: "," }));
  assert.equal(
    tag`My friends are (${["bob", "sally", "jim"]})`,
    "My friends are (bob, sally, jim)",
  );
});

test("supports serial/oxford separators", () => {
  const tag = createTag(
    inlineArrayTransformer({ separator: ",", conjunction: "or", serial: true }),
  );
  assert.equal(
    tag`My friends are always ${["dramatic", "emotional", "needy"]}`,
    "My friends are always dramatic, emotional, or needy",
  );
});

test("maintains indentation", () => {
  const tag = createTag(inlineArrayTransformer());
  assert.equal(
    tag`My friends are always
  ${["dramatic", "emotional", "needy"]}`,
    "My friends are always\n  dramatic\n  emotional\n  needy",
  );
});

test("maintains indentation in multiline strings", () => {
  const tag = createTag(inlineArrayTransformer({ separator: "," }));
  assert.equal(
    tag`My friends are always
  ${["dra-\nmatic", "emo-\ntional", "nee-\ndy"]}`,
    "My friends are always\n  dra-\n  matic,\n  emo-\n  tional,\n  nee-\n  dy",
  );
});

test("maintains indentation in multiline strings (with conjunction)", () => {
  const tag = createTag(
    inlineArrayTransformer({ separator: ",", conjunction: "and" }),
  );
  assert.equal(
    tag`My friends are always
  ${["dra-\nmatic", "emo-\ntional", "nee-\ndy"]}`,
    "My friends are always\n  dra-\n  matic,\n  emo-\n  tional\n  and nee-\n  dy",
  );
});

test("maintains indentation in multiline strings (with serial/oxford separators)", () => {
  const tag = createTag(
    inlineArrayTransformer({
      separator: ",",
      conjunction: "and",
      serial: true,
    }),
  );
  assert.equal(
    tag`My friends are always
  ${["dra-\nmatic", "emo-\ntional", "nee-\ndy"]}`,
    "My friends are always\n  dra-\n  matic,\n  emo-\n  tional,\n  and nee-\n  dy",
  );
});

test("does not introduce excess newlines", () => {
  const tag = createTag(inlineArrayTransformer());
  assert.equal(
    tag`My friends are always

  ${["dramatic", "emotional", "needy"]}`,
    "My friends are always\n\n  dramatic\n  emotional\n  needy",
  );
});

test.run();
