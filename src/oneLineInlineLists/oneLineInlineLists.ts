import { createTag } from "../createTag/createTag.ts";
import { inlineArrayTransformer } from "../inlineArrayTransformer/inlineArrayTransformer.ts";
import { trimResultTransformer } from "../trimResultTransformer/index.ts";
import { replaceResultTransformer } from "../replaceResultTransformer/index.ts";

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
