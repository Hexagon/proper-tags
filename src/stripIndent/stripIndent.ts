import { createTag } from "../createTag/createTag.ts";
import { stripIndentTransformer } from "../stripIndentTransformer/index.ts";
import { trimResultTransformer } from "../trimResultTransformer/index.ts";

/**
 * If you want to strip the initial indentation from the beginning of each line in a multiline string.
 * Important note: this tag will not indent multiline strings coming from the substitutions.
 * If you want that behavior, use the `html` tag (aliases: `source`, `codeBlock`).
 */
const stripIndent = createTag(
  stripIndentTransformer(),
  trimResultTransformer("smart"),
);

export { stripIndent };
