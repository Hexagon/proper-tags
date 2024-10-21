import { test } from "uvu";
import * as assert from "uvu/assert";

import { flat } from "./flat.ts";

test("leaves flat array as-is", () => {
  assert.equal(flat([1, 2, 3]), [1, 2, 3]);
});

test("flattens array elements", () => {
  assert.equal(flat([[1], [2, 3]]), [1, 2, 3]);
});

test("handles mixed content", () => {
  assert.equal(flat([1, [2, 3]]), [1, 2, 3]);
});

test("doesn't flatten more than 1 level", () => {
  assert.equal(flat([1, [2, [3]]]), [1, 2, [3]]);
});

test.run();
