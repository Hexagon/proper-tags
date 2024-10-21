import { createTag } from "../createTag/createTag.ts";
import { stripIndent } from "../stripIndent/stripIndent.ts";
import { inlineArrayTransformer } from "../inlineArrayTransformer/inlineArrayTransformer.ts";

/**
 * Allows you to inline an array substitution as a comma-separated list.
 * @implements {TemplateTag}
 */
const commaLists = createTag(
  inlineArrayTransformer({ separator: "," }),
  stripIndent,
);

export { commaLists };
