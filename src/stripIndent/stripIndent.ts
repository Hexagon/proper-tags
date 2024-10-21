import { createTag } from "../createTag/index.js";
import { stripIndentTransformer } from "../stripIndentTransformer/index.js";
import { trimResultTransformer } from "../trimResultTransformer/index.js";

/**
 * If you want to strip the initial indentation from the beginning of each line in a multiline string.
 * Important note: this tag will not indent multiline strings coming from the substitutions.
 * If you want that behavior, use the `html` tag (aliases: `source`, `codeBlock`).
 * @implements {TemplateTag}
 */
const stripIndent = createTag(
  stripIndentTransformer(),
  trimResultTransformer("smart"),
);

export { stripIndent };
