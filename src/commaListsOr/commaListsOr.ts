import { createTag } from "../createTag/createTag.ts";
import { stripIndent } from "../stripIndent/stripIndent.ts";
import { inlineArrayTransformer } from "../inlineArrayTransformer/inlineArrayTransformer.ts";

/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "or".
 * @implements {TemplateTag}
 */
const commaListsOr = createTag(
  inlineArrayTransformer({ separator: ",", conjunction: "or" }),
  stripIndent,
);

export { commaListsOr };
