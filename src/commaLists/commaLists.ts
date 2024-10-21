import { createTag } from "../createTag/index.js";
import { stripIndent } from "../stripIndent/index.js";
import { inlineArrayTransformer } from "../inlineArrayTransformer/index.js";

/**
 * Allows you to inline an array substitution as a comma-separated list.
 * @implements {TemplateTag}
 */
const commaLists = createTag(
  inlineArrayTransformer({ separator: "," }),
  stripIndent,
);

export { commaLists };
