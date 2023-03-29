import { createTag } from '../createTag/index.js';
import { stripIndentTransformer } from '../stripIndentTransformer/index.js';
import { trimResultTransformer } from '../trimResultTransformer/index.js';

/**
 * If you want to strip *all* of the indentation from the beginning of each line in a multiline string.
 * @implements {TemplateTag}
 */
const stripIndents = createTag(
  stripIndentTransformer('all'),
  trimResultTransformer('smart'),
);

export { stripIndents };
