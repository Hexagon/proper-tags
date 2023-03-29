/**
 * @class TemplateTag
 * @classdesc Consumes a pipeline of composable transformer plugins and produces a template tag.
 */
export class TemplateTag {
    /**
     * constructs a template tag
     * @constructs TemplateTag
     * @param  {...Object} [...transformers] - an array or arguments list of transformers
     * @return {Function}                    - a template tag
     */
    constructor(...transformers: any[]);
}
/**
 * An HTML tag function that processes a template literal and returns an HTML string.
 * @type {TemplateTag}
 */
export const html: TemplateTag;
/**
 * Allows you to inline an array substitution as a comma-separated list.
 * @type {TemplateTag}
 */
export const commaLists: TemplateTag;
/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "and".
 * @type {TemplateTag}
 */
export const commaListsAnd: TemplateTag;
/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "or".
 * @type {TemplateTag}
 */
export const commaListsOr: TemplateTag;
/**
 * Consumes a pipeline of composable transformer plugins and produces a template tag.
 * @param  {...Object} [...rawTransformers] - An array or arguments list of transformers
 * @return {Function}                       - A template tag
 */
export function createTag(...rawTransformers: any[]): Function;
/**
 * A no-op tag that might come in useful in some scenarios, e.g. mocking.
 * @type {TemplateTag}
 */
export const id: TemplateTag;
/**
 * Converts an array substitution to a string containing a list
 * @param {String} [opts.separator = '']   - The character that separates each item
 * @param {String} [opts.conjunction = ''] - Replace the last separator with this
 * @param {Boolean} [opts.serial = false]  - Include the separator before the conjunction? (Oxford comma use-case)
 *
 * @return {Object}                        - A transformer
 */
export function inlineArrayTransformer({ conjunction, separator, serial, }?: string): any;
export const inlineLists: Function;
export const oneLine: Function;
export const oneLineCommaLists: Function;
export const oneLineCommaListsAnd: Function;
export const oneLineCommaListsOr: Function;
export const oneLineInlineLists: Function;
export const oneLineTrim: Function;
export function removeNonPrintingValuesTransformer(): {
    onSubstitution(substitution: any): any;
};
/**
 * Replaces tabs, newlines and spaces with the chosen value when they occur in sequences
 * @param  {(String|RegExp)} replaceWhat - the value or pattern that should be replaced
 * @param  {*}               replaceWith - the replacement value
 * @return {Object}                      - a TemplateTag transformer
 */
export function replaceResultTransformer(replaceWhat: (string | RegExp), replaceWith: any): any;
export function replaceStringTransformer(replaceWhat: any, replaceWith: any): {
    onString(str: any): any;
};
export function replaceSubstitutionTransformer(replaceWhat: any, replaceWith: any): {
    onSubstitution(substitution: any): any;
};
export const safeHtml: Function;
export function splitStringTransformer(splitBy: any): {
    onSubstitution(substitution: any): any;
};
export const stripIndent: Function;
/**
 * strips indentation from a template literal
 * @param  {String} type = 'initial' - whether to remove all indentation or just leading indentation. can be 'all' or 'initial'
 * @return {Object}                  - a TemplateTag transformer
 */
export function stripIndentTransformer(type?: string): any;
export const stripIndents: Function;
/**
 * TemplateTag transformer that trims whitespace on the end result of a tagged template
 * @param  {String} side = '' - The side of the string to trim. Can be 'start' or 'end' (alternatively 'left' or 'right')
 * @return {Object}           - a TemplateTag transformer
 */
export function trimResultTransformer(side?: string): any;
export { html as codeBlock, html as source };
