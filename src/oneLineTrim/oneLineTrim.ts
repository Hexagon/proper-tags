import { createTag } from "../createTag/index.js";
import { trimResultTransformer } from "../trimResultTransformer/index.js";
import { replaceResultTransformer } from "../replaceResultTransformer/index.js";

/**
 * Allows you to keep your single-line strings under 80 characters while trimming the new lines.
 * @implements {TemplateTag}
 */
const oneLineTrim = createTag(
  replaceResultTransformer(/(?:\n\s*)/g, ""),
  trimResultTransformer(),
);

export { oneLineTrim };
