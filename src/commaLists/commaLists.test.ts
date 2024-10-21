import { test } from "uvu";
import * as assert from "uvu/assert";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { commaLists } from "./commaLists.ts";
import { readFromFixture } from "../testUtils/index.ts";

const val = "amaze";

test("includes arrays as comma-separated list", () => {
  const fruits = ["apple", "banana", "kiwi"];
  const expected = readFromFixture(__dirname, "commaLists");
  const actual = commaLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  assert.equal(actual, expected);
});

test.run();
