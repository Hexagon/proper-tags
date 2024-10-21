import { createTag } from "../createTag/index.js";
import { stripIndent } from "../stripIndent/index.js";
import { inlineArrayTransformer } from "../inlineArrayTransformer/index.js";

/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "and".
 * @implements {TemplateTag}
 */
const commaListsAnd = createTag(
  inlineArrayTransformer({ separator: ",", conjunction: "and" }),
  stripIndent,
);

export { commaListsAnd };
