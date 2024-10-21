import { createTag } from "../createTag/createTag.ts";
import { trimResultTransformer } from "../trimResultTransformer/index.ts";
import { replaceResultTransformer } from "../replaceResultTransformer/index.ts";

/**
 * Allows you to keep your single-line strings under 80 characters without resorting to crazy string concatenation.
 * @implements {TemplateTag}
 */
const oneLine = createTag(
  replaceResultTransformer(/(?:\n(?:\s*))+/g, " "),
  trimResultTransformer(),
);

export { oneLine };
