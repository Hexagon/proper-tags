import { test } from "uvu";
import * as assert from "uvu/assert";

import { replaceSubstitutionTransformer } from "./replaceSubstitutionTransformer.ts";
import { createTag } from "../createTag/createTag.ts";

test("only operates on substitutions", () => {
  const tag = createTag(
    replaceSubstitutionTransformer(/</g, "&lt;"),
    replaceSubstitutionTransformer(/>/g, "&gt;"),
  );
  assert.equal(
    tag`<h1>foo${"<bar></bar>"}</h1>`,
    "<h1>foo&lt;bar&gt;&lt;/bar&gt;</h1>",
  );
});

test("does not touch undefined and null substitutions", () => {
  const tag = createTag(replaceSubstitutionTransformer(/u/g, ""));
  assert.equal(tag`foo ${undefined} bar ${null}`, "foo undefined bar null");
});

test("works on numbers", () => {
  const tag = createTag(replaceSubstitutionTransformer(/2/g, "3"));
  assert.equal(tag`foo ${2} bar ${43.12}`, "foo 3 bar 43.13");
});

test("works on arrays", () => {
  const tag = createTag(replaceSubstitutionTransformer(/foo/g, "bar"));
  assert.equal(tag`${["foo", "bar", "foo"]}`, "bar,bar,bar");
});

test("throws error if no arguments are supplied", () => {
  assert.throws(() => {
    replaceSubstitutionTransformer();
  }, /requires exactly 2 arguments/);
});

test.run();
