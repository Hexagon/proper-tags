import { createTag } from "../createTag/index.js";
import { inlineArrayTransformer } from "../inlineArrayTransformer/index.ts";
import { trimResultTransformer } from "../trimResultTransformer/index.js";
import { replaceResultTransformer } from "../replaceResultTransformer/index.js";

/**
 * Allows you to inline an array substitution as a list, rendered out on a single line.
 * @implements {TemplateTag}
 */
const oneLineInlineLists = createTag(
  inlineArrayTransformer(),
  replaceResultTransformer(/(?:\s+)/g, " "),
  trimResultTransformer(),
);

export { oneLineInlineLists };
