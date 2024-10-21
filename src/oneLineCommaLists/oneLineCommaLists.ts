import { createTag } from "../createTag/index.js";
import { inlineArrayTransformer } from "../inlineArrayTransformer/index.ts";
import { trimResultTransformer } from "../trimResultTransformer/index.js";
import { replaceResultTransformer } from "../replaceResultTransformer/index.js";

/**
 * Allows you to inline an array substitution as a comma-separated list, and is rendered out on to a single line.
 * @implements {TemplateTag}
 */
const oneLineCommaLists = createTag(
  inlineArrayTransformer({ separator: "," }),
  replaceResultTransformer(/(?:\s+)/g, " "),
  trimResultTransformer(),
);

export { oneLineCommaLists };
