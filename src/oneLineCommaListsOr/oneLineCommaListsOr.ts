import { createTag } from "../createTag/createTag.ts";
import { inlineArrayTransformer } from "../inlineArrayTransformer/inlineArrayTransformer.ts";
import { trimResultTransformer } from "../trimResultTransformer/index.ts";
import { replaceResultTransformer } from "../replaceResultTransformer/index.ts";

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
