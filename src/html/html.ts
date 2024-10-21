import { createTag } from "../createTag/createTag.ts";
import { stripIndent } from "../stripIndent/stripIndent.ts";
import { inlineArrayTransformer } from "../inlineArrayTransformer/inlineArrayTransformer.ts";
import { splitStringTransformer } from "../splitStringTransformer/index.ts";
import { removeNonPrintingValuesTransformer } from "../removeNonPrintingValuesTransformer/index.ts";

/**
 * A function that returns an HTML string by processing a template literal or a JSTag function.
 * @function
 * @implements {TemplateTag}
 */
const html = createTag(
  splitStringTransformer("\n"),
  removeNonPrintingValuesTransformer(),
  inlineArrayTransformer(),
  stripIndent,
);

export { html };
