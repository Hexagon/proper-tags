// core
export { createTag } from "./createTag/index.ts";

// transformers
export { inlineArrayTransformer } from "./inlineArrayTransformer/index.ts";
export { removeNonPrintingValuesTransformer } from "./removeNonPrintingValuesTransformer/index.ts";
export { replaceResultTransformer } from "./replaceResultTransformer/index.ts";
export { replaceStringTransformer } from "./replaceStringTransformer/index.ts";
export { replaceSubstitutionTransformer } from "./replaceSubstitutionTransformer/index.ts";
export { splitStringTransformer } from "./splitStringTransformer/index.ts";
export { stripIndentTransformer } from "./stripIndentTransformer/index.ts";
export { trimResultTransformer } from "./trimResultTransformer/index.ts";

// tags
export { codeBlock } from "./codeBlock/index.ts";
export { commaLists } from "./commaLists/index.ts";
export { commaListsAnd } from "./commaListsAnd/index.ts";
export { commaListsOr } from "./commaListsOr/index.ts";
export { html } from "./html/index.ts";
export { id } from "./id/index.ts";
export { inlineLists } from "./inlineLists/index.ts";
export { oneLine } from "./oneLine/index.ts";
export { oneLineCommaLists } from "./oneLineCommaLists/index.ts";
export { oneLineCommaListsAnd } from "./oneLineCommaListsAnd/index.ts";
export { oneLineCommaListsOr } from "./oneLineCommaListsOr/index.ts";
export { oneLineInlineLists } from "./oneLineInlineLists/index.ts";
export { oneLineTrim } from "./oneLineTrim/index.ts";
export { safeHtml } from "./safeHtml/index.ts";
export { source } from "./source/index.ts";
export { stripIndent } from "./stripIndent/index.ts";
export { stripIndents } from "./stripIndents/index.ts";

// deprecated
export { TemplateTag } from "./TemplateTag/index.ts";
