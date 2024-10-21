import { flat } from "../utils/index.ts";

const tagTransformersSymbol = "COMMON_TAGS_TAG_TRANSFORMERS_SYMBOL";

function isTag(fn: Function): boolean {
  return typeof fn === "function" && tagTransformersSymbol in fn;
}

function cleanTransformers(transformers: Transformer[]): Transformer[] {
  return flat(transformers).reduce(
    (transformers, transformer) =>
      isTag(transformer)
        ? [...transformers, ...transformer[tagTransformersSymbol]]
        : [...transformers, transformer],
    [] as Transformer[],
  );
}

interface Transformer {
  [tagTransformersSymbol]?: Function[];
  getInitialContext?: () => Record<string, any>;
  onString?: (str: string, context: Record<string, any>) => string;
  onSubstitution?: (
    substitution: any,
    result: string,
    context: Record<string, any>,
  ) => string;
  onEndResult?: (result: string, context: Record<string, any>) => string;
}

/**
 * An intermediary template tag that receives a template tag and passes the result of calling the template with the received
 * template tag to our own template tag.
 * @param  {Function}           nextTag         - The received template tag
 * @param  {Array<String>}   template         - The template to process
 * @param  {...*}               ...substitutions - `substitutions` is an array of all substitutions in the template
 * @return {*}                                   - The final processed value
 */
function getInterimTag(originalTag: Function, extraTag: Function): Function {
  return function tag(...args: any[]): any {
    return originalTag(["", ""], extraTag(...args));
  };
}

function getTagCallInfo(transformers: Transformer[]) {
  return {
    transformers,
    context: transformers.map((transformer) =>
      transformer.getInitialContext ? transformer.getInitialContext() : {}
    ),
  };
}

/**
 * Iterate through each transformer, calling the transformer's specified hook.
 * @param {Array<Function>} transformers - The transformer functions
 * @param {String} hookName               - The name of the hook
 * @param {String} initialString         - The input string
 * @return {String}                       - The final results of applying each transformer
 */
function applyHook0(
  { transformers, context }: { transformers: Transformer[]; context: any[] },
  hookName: "onString" | "onEndResult",
  initialString: string,
): string {
  return transformers.reduce(
    (result, transformer, index) =>
      transformer[hookName] ? transformer[hookName]!(result, context[index]) : result,
    initialString,
  );
}

/**
 * Iterate through each transformer, calling the transformer's specified hook.
 * @param {Array<Function>} transformers - The transformer functions
 * @param {String} hookName               - The name of the hook
 * @param {String} initialString         - The input string
 * @param {*} arg1                       - An additional argument passed to the hook
 * @return {String}                       - The final results of applying each transformer
 */
function applyHook1(
  { transformers, context }: { transformers: Transformer[]; context: any[] },
  hookName: "onSubstitution",
  initialString: string,
  arg1: any,
): string {
  return transformers.reduce(
    (result, transformer, index) =>
      transformer[hookName] ? transformer[hookName]!(result, arg1, context[index]) : result,
    initialString,
  );
}

/**
 * Consumes a pipeline of composable transformer plugins and produces a template tag.
 * @param  {...Object} [...rawTransformers] - An array or arguments list of transformers
 * @return {Function}                       - A template tag
 */
export function createTag(...rawTransformers: Transformer[]): Transformer {
  const transformers = cleanTransformers(rawTransformers);

  function tag(strings: TemplateStringsArray | Function, ...expressions: any[]): any {
    if (typeof strings === "function") {
      // if the first argument passed is a function, assume it is a template tag and return
      // an intermediary tag that processes the template using the aforementioned tag, passing the
      // result to our tag
      return getInterimTag(tag, strings);
    }

    if (!Array.isArray(strings)) {
      return tag([strings as unknown as string] as unknown as TemplateStringsArray);
    }

    const tagCallInfo = getTagCallInfo(transformers);

    // if the first argument is an array, return a transformed end result of processing the template with our tag
    const processedTemplate = strings
      .map((string) => applyHook0(tagCallInfo, "onString", string))
      .reduce((result, string, index) =>
        "".concat(
          result,
          applyHook1(
            tagCallInfo,
            "onSubstitution",
            expressions[index - 1],
            result,
          ),
          string,
        )
      );

    return applyHook0(tagCallInfo, "onEndResult", processedTemplate);
  }

  (tag as any)[tagTransformersSymbol] = transformers;

  return tag;
}
