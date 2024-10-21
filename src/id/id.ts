import { createTag } from "../createTag/index.js";

/**
 * A no-op tag that might come in useful in some scenarios, e.g. mocking.
 * @implements {TemplateTag}
 */
const id = createTag();

export { id };
