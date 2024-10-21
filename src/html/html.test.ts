import { test } from "uvu";
import * as assert from "uvu/assert";

/* Recreate __dirname */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { html } from "./html.ts";
import { readFromFixture } from "../testUtils/index.ts";

const val = "amaze";
const nil = null;

test("renders HTML, including arrays", () => {
  const fruits = ["apple", "banana", "kiwi"];
  const expected = readFromFixture(__dirname, "html");
  const actual = html`
    <h1>${val}${nil}</h1>
    <ul>
      ${fruits.map((fruit) => `<li>${fruit}</li>`)}
    </ul>
  `;

  assert.equal(actual, expected);
});

test("converts strings containing newlines into proper indented output", () => {
  const newlines = "<li>one</li>\n<li>two</li>";
  const expected = readFromFixture(__dirname, "newline-conversion");
  const actual = html`
    <h1>${val}${nil}</h1>
    <ul>
      ${newlines}
      <li>three</li>
    </ul>
  `;

  assert.equal(actual, expected);
});

test("does not introduce excess newlines", () => {
  const newlines = "<li>one</li>\n<li>two</li>";
  const expected = readFromFixture(
    __dirname,
    "newline-conversion-after-newline",
  );
  /* eslint-disable prettier/prettier */
  const actual = html`
    <h1>${val}${nil}</h1>
    <ul>

      ${newlines}
      <li>three</li>
    </ul>
  `;
  /* eslint-enable prettier/prettier */

  assert.equal(actual, expected);
});

test("renders nested HTML", () => {
  const fruits = ["apple", "banana", "kiwi"];
  const expected = readFromFixture(__dirname, "nesting");

  function renderFruit(fruit) {
    return html`
      <li>
        <div>${fruit}</div>
      </li>
    `;
  }

  const actual = html`
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <ul>
          ${fruits.map(renderFruit)}
        </ul>
      </body>
    </html>
  `;

  assert.equal(actual, expected);
});

test("renders nested HTML without excess empty lines", () => {
  const fruits = ["apple", "banana", "kiwi"];
  const expected = readFromFixture(__dirname, "nesting-no-excess");

  function renderFruit(fruit) {
    return html`
      <li>
        <div>${fruit}</div>
      </li>
    `;
  }

  /* eslint-disable prettier/prettier */
  const actual = html`
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <ul>

          ${fruits.map(renderFruit)}

        </ul>
      </body>
    </html>
  `;
  /* eslint-enable prettier/prettier */

  assert.equal(actual, expected);
});

test("just strips indent when there's an empty array inside", () => {
  const expected = readFromFixture(__dirname, "empty-array");
  /* eslint-disable prettier/prettier */
  const actual = html`
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <ul>${[]}</ul>
      </body>
    </html>
  `;
  /* eslint-enable prettier/prettier */

  assert.equal(actual, expected);
});

test("just strips indent when there's an empty array inside (multiline)", () => {
  const expected = readFromFixture(__dirname, "empty-array-multiline");
  const actual = html`
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <ul>
          ${[]}
        </ul>
      </body>
    </html>
  `;

  assert.equal(actual, expected);
});

test("may not indent as expected when the array is not in a new line", () => {
  const fruits = ["apple", "banana", "kiwi"];
  const expected = readFromFixture(__dirname, "nesting-improper");

  function renderFruit(fruit) {
    return html`
      <li>
        <div>${fruit}</div>
      </li>
    `;
  }

  /* eslint-disable prettier/prettier */
  const actual = html`
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <ul>${fruits.map(renderFruit)}</ul>
      </body>
    </html>
  `;
  /* eslint-enable prettier/prettier */

  assert.equal(actual, expected);
});

test.run();
