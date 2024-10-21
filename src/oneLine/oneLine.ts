import { createTag } from "../createTag/index.js";
import { trimResultTransformer } from "../trimResultTransformer/index.js";
import { replaceResultTransformer } from "../replaceResultTransformer/index.js";

/**
 * Allows you to keep your single-line strings under 80 characters without resorting to crazy string concatenation.
 * @implements {TemplateTag}
 */
const oneLine = createTag(
  replaceResultTransformer(/(?:\n(?:\s*))+/g, " "),
  trimResultTransformer(),
);

export { oneLine };
