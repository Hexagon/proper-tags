import { createTag } from "../createTag/createTag.ts";
import { stripIndent } from "../stripIndent/stripIndent.ts";
import { inlineArrayTransformer } from "../inlineArrayTransformer/inlineArrayTransformer.ts";

/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "and".
 * @implements {TemplateTag}
 */
const commaListsAnd = createTag(
  inlineArrayTransformer({ separator: ",", conjunction: "and" }),
  stripIndent,
);

export { commaListsAnd };
