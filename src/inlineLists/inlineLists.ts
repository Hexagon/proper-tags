import { createTag } from "../createTag/createTag.ts";
import { stripIndent } from "../stripIndent/stripIndent.ts";
import { inlineArrayTransformer } from "../inlineArrayTransformer/inlineArrayTransformer.ts";

/**
 * Allows you to inline an array substitution as a list.
 * @implements {TemplateTag}
 */
const inlineLists = createTag(inlineArrayTransformer(), stripIndent);

export { inlineLists };
