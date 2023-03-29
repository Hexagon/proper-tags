import { createTag } from '../createTag/index.js';
import { stripIndent } from '../stripIndent/index.js';
import { inlineArrayTransformer } from '../inlineArrayTransformer/index.js';
import { splitStringTransformer } from '../splitStringTransformer/index.js';
import { removeNonPrintingValuesTransformer } from '../removeNonPrintingValuesTransformer/index.js';

/**
 * An HTML tag function that processes a template literal and returns an HTML string.
 * @type {TemplateTag}
 */
const html = createTag(
  splitStringTransformer('\n'),
  removeNonPrintingValuesTransformer(),
  inlineArrayTransformer(),
  stripIndent,
);

export { html };
