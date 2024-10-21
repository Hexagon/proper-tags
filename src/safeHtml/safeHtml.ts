import { createTag } from "../createTag/index.js";
import { stripIndent } from "../stripIndent/index.js";
import { inlineArrayTransformer } from "../inlineArrayTransformer/index.ts";
import { splitStringTransformer } from "../splitStringTransformer/index.js";
import { replaceSubstitutionTransformer } from "../replaceSubstitutionTransformer/index.ts";

/**
 * A tag very similar to `html` but it does safe HTML escaping for strings coming from substitutions.
 * When combined with regular `html` tag, you can do basic HTML templating that is safe from
 * XSS (Cross-Site Scripting) attacks.
 * @implements {TemplateTag}
 */
const safeHtml = createTag(
  splitStringTransformer("\n"),
  inlineArrayTransformer(),
  stripIndent,
  replaceSubstitutionTransformer(/&/g, "&amp;"),
  replaceSubstitutionTransformer(/</g, "&lt;"),
  replaceSubstitutionTransformer(/>/g, "&gt;"),
  replaceSubstitutionTransformer(/"/g, "&quot;"),
  replaceSubstitutionTransformer(/'/g, "&#x27;"),
  replaceSubstitutionTransformer(/`/g, "&#x60;"),
);

export { safeHtml };
