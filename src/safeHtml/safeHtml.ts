import { createTag } from "../createTag/createTag.ts";
import { stripIndent } from "../stripIndent/stripIndent.ts";
import { inlineArrayTransformer } from "../inlineArrayTransformer/inlineArrayTransformer.ts";
import { splitStringTransformer } from "../splitStringTransformer/index.ts";
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
