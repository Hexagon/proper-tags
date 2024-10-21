import { test } from "uvu";
import * as assert from "uvu/assert";

/* Recreate __dirname */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { replaceStringTransformer } from "./replaceStringTransformer.ts";
import { createTag } from "../createTag/index.js";

test("only operates on strings", () => {
  const tag = createTag(
    replaceStringTransformer(/</g, "&lt;"),
    replaceStringTransformer(/>/g, "&gt;"),
  );
  assert.equal(
    tag`<h1>foo${"<bar></bar>"}</h1>`,
    "&lt;h1&gt;foo<bar></bar>&lt;/h1&gt;",
  );
});

test("throws error if no arguments are supplied", () => {
  assert.throws(() => {
    replaceStringTransformer();
  }, /requires exactly 2 arguments/);
});

test.run();
