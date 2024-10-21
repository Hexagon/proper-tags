import { toString } from "../toString/index.ts";

export function prefixLines(prefix, value, skipFirst = false) {
  return toString(value)
    .split("\n")
    .map((line, index) => skipFirst && index === 0 ? line : "".concat(prefix, line))
    .join("\n");
}
