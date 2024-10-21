import { test } from "uvu";
import * as assert from "uvu/assert";

/* Recreate __dirname */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { inlineLists } from "./inlineLists.ts";
import { readFromFixture } from "../testUtils/index.js";

const val = "amaze";

test("includes arrays as space-separated list", () => {
  const fruits = ["apple", "banana", "kiwi"];
  const expected = readFromFixture(__dirname, "inlineLists");
  const actual = inlineLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  assert.equal(actual, expected);
});

test.run();
