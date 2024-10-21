import { test } from "uvu";
import * as assert from "uvu/assert";

/* Recreate __dirname */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { oneLineCommaListsAnd } from "./oneLineCommaListsAnd.ts";
import { readFromFixture } from "../testUtils/index.ts";

const val = "amaze";

test('includes arrays as comma-separated list on one line with "and"', () => {
  const fruits = ["apple", "banana", "kiwi"];
  const expected = readFromFixture(__dirname, "oneLineCommaListsAnd").trim();
  const actual = oneLineCommaListsAnd`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  assert.equal(actual, expected);
});

test("only returns the first item of a single element array", () => {
  const fruits = ["apple"];
  const expected = readFromFixture(
    __dirname,
    "oneLineCommaListsAndSingleItem",
  ).trim();
  const actual = oneLineCommaListsAnd`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  assert.equal(actual, expected);
});

test.run();
