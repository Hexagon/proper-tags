import { test } from "uvu";
import * as assert from "uvu/assert";

/* Recreate __dirname */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { oneLineCommaListsOr } from "./oneLineCommaListsOr.ts";
import { readFromFixture } from "../testUtils/index.ts";

const val = "amaze";

test('includes arrays as comma-separated list on one line with "or"', () => {
  const fruits = ["apple", "banana", "kiwi"];
  const expected = readFromFixture(__dirname, "oneLineCommaListsOr").trim();
  const actual = oneLineCommaListsOr`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  assert.equal(actual, expected);
});

test("only returns the first item of a single element array", () => {
  const fruits = ["apple"];
  const expected = readFromFixture(
    __dirname,
    "oneLineCommaListsOrSingleItem",
  ).trim();
  const actual = oneLineCommaListsOr`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  assert.equal(actual, expected);
});

test.run();
