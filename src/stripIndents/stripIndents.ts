import { createTag } from "../createTag/createTag.ts";
import { stripIndentTransformer } from "../stripIndentTransformer/index.ts";
import { trimResultTransformer } from "../trimResultTransformer/index.ts";

/**
 * If you want to strip *all* of the indentation from the beginning of each line in a multiline string.
 * @implements {TemplateTag}
 */
const stripIndents = createTag(
  stripIndentTransformer("all"),
  trimResultTransformer("smart"),
);

export { stripIndents };
