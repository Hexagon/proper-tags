export const __esModule: boolean;
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
 * A function that returns an HTML string by processing a template literal or a JSTag function.
 * @function
 * @implements {TemplateTag}
*/
export const html: Function;
/**
 * Allows you to inline an array substitution as a comma-separated list.
 * @implements {TemplateTag}
 */
export const commaLists: Function;
/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "and".
 * @implements {TemplateTag}
 */
export const commaListsAnd: Function;
/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "or".
 * @implements {TemplateTag}
 */
export const commaListsOr: Function;
/**
 * Consumes a pipeline of composable transformer plugins and produces a template tag.
 * @param  {...Object} [...rawTransformers] - An array or arguments list of transformers
 * @return {Function}                       - A template tag
 */
export function createTag(...rawTransformers: any[]): Function;
/**
 * A no-op tag that might come in useful in some scenarios, e.g. mocking.
 * @implements {TemplateTag}
 */
export const id: Function;
/**
 * Converts an array substitution to a string containing a list
 * @param {String} [opts.separator = '']   - The character that separates each item
 * @param {String} [opts.conjunction = ''] - Replace the last separator with this
 * @param {Boolean} [opts.serial = false]  - Include the separator before the conjunction? (Oxford comma use-case)
 *
 * @return {Object}                        - A transformer
 */
export function inlineArrayTransformer({ conjunction, separator, serial, }?: string): any;
/**
 * Allows you to inline an array substitution as a list.
 * @implements {TemplateTag}
 */
export const inlineLists: Function;
/**
 * Allows you to keep your single-line strings under 80 characters without resorting to crazy string concatenation.
 * @implements {TemplateTag}
 */
export const oneLine: Function;
/**
 * Allows you to inline an array substitution as a comma-separated list, and is rendered out on to a single line.
 * @implements {TemplateTag}
 */
export const oneLineCommaLists: Function;
/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "and", and is rendered out on to a single line.
 * @implements {TemplateTag}
 */
export const oneLineCommaListsAnd: Function;
/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "or", and is rendered out on to a single line.
 * @implements {TemplateTag}
 */
export const oneLineCommaListsOr: Function;
/**
 * Allows you to inline an array substitution as a list, rendered out on a single line.
 * @implements {TemplateTag}
 */
export const oneLineInlineLists: Function;
/**
 * Allows you to keep your single-line strings under 80 characters while trimming the new lines.
 * @implements {TemplateTag}
 */
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
/**
 * Replaces the result of all substitutions (results of calling ${ ... }) with a new value.
 * Same as for `replaceResultTransformer`, replaceWhat can be a string or regular expression and replaceWith is the new value.
 */
export function replaceSubstitutionTransformer(replaceWhat: any, replaceWith: any): {
    onSubstitution(substitution: any): any;
};
/**
 * A tag very similar to `html` but it does safe HTML escaping for strings coming from substitutions.
 * When combined with regular `html` tag, you can do basic HTML templating that is safe from
 * XSS (Cross-Site Scripting) attacks.
 * @implements {TemplateTag}
 */
export const safeHtml: Function;
/**
 * Splits a string substitution into an array by the provided splitBy substring, only if the string contains the splitBy substring.
 */
export function splitStringTransformer(splitBy: any): {
    onSubstitution(substitution: any): any;
};
/**
 * If you want to strip the initial indentation from the beginning of each line in a multiline string.
 * Important note: this tag will not indent multiline strings coming from the substitutions.
 * If you want that behavior, use the `html` tag (aliases: `source`, `codeBlock`).
 * @implements {TemplateTag}
 */
export const stripIndent: Function;
/**
 * strips indentation from a template literal
 * @param  {String} type = 'initial' - whether to remove all indentation or just leading indentation. can be 'all' or 'initial'
 * @return {Object}                  - a TemplateTag transformer
 */
export function stripIndentTransformer(type?: string): any;
/**
 * If you want to strip *all* of the indentation from the beginning of each line in a multiline string.
 * @implements {TemplateTag}
 */
export const stripIndents: Function;
/**
 * TemplateTag transformer that trims whitespace on the end result of a tagged template
 * @param  {String} side = '' - The side of the string to trim. Can be 'start' or 'end' (alternatively 'left' or 'right')
 * @return {Object}           - a TemplateTag transformer
 */
export function trimResultTransformer(side?: string): any;
export { html as codeBlock, html as source };
