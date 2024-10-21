import { createTag } from "../createTag/index.js";
import { inlineArrayTransformer } from "../inlineArrayTransformer/index.ts";
import { trimResultTransformer } from "../trimResultTransformer/index.js";
import { replaceResultTransformer } from "../replaceResultTransformer/index.js";

/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "or", and is rendered out on to a single line.
 * @implements {TemplateTag}
 */
const oneLineCommaListsOr = createTag(
  inlineArrayTransformer({ separator: ",", conjunction: "or" }),
  replaceResultTransformer(/(?:\s+)/g, " "),
  trimResultTransformer(),
);

export { oneLineCommaListsOr };
