import { createTag } from '../createTag/index.js';
import { stripIndent } from '../stripIndent/index.js';
import { inlineArrayTransformer } from '../inlineArrayTransformer/index.js';
import { splitStringTransformer } from '../splitStringTransformer/index.js';
import { removeNonPrintingValuesTransformer } from '../removeNonPrintingValuesTransformer/index.js';

/**
 * A function that returns an HTML string by processing a template literal or a JSTag function.
 * @function
 * @implements {TemplateTag}
*/
const html = createTag(
  splitStringTransformer('\n'),
  removeNonPrintingValuesTransformer(),
  inlineArrayTransformer(),
  stripIndent,
);

export { html };
