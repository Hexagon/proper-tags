import { test } from "uvu";
import * as assert from "uvu/assert";

/* Recreate __dirname */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { readFromFixture } from "./readFromFixture.ts";

test("reads the correct fixture contents", () => {
  const actual = readFromFixture(__dirname, "contents");
  const expected = "wow such doge\n";
  assert.equal(actual, expected);
});

test("should throw if no file was found", () => {
  assert.throws(() => {
    readFromFixture(__dirname, "nothing");
  }, /ENOENT/);
});

test.run();
