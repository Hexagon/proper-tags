import { createTag } from '../createTag/index.js';
import { stripIndent } from '../stripIndent/index.js';
import { inlineArrayTransformer } from '../inlineArrayTransformer/index.js';

/**
 * Allows you to inline an array substitution as a list.
 * @implements {TemplateTag}
 */
const inlineLists = createTag(inlineArrayTransformer(), stripIndent);

export { inlineLists };
