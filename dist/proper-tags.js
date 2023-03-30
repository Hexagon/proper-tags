function flat(array) {
  return [].concat(...array);
}

function toString(value) {
  // Use concat rather than string so that the behavior is the same as when
  // expressions are evaluated in templates (look for Runtime Semantics:
  // Evaluation of a TemplateLiteral).
  return ''.concat(value);
}

function prefixLines(prefix, value, skipFirst = false) {
  return toString(value)
    .split('\n')
    .map((line, index) =>
      skipFirst && index === 0 ? line : ''.concat(prefix, line),
    )
    .join('\n');
}

function stripLastNewLine(value) {
  const stringValue = toString(value);
  const { length } = stringValue;
  return length > 0 && stringValue[length - 1] === '\n'
    ? stringValue.slice(0, length - 1)
    : stringValue;
}

const tagTransformersSymbol = 'COMMON_TAGS_TAG_TRANSFORMERS_SYMBOL';

function isTag(fn) {
  return typeof fn === 'function' && fn[tagTransformersSymbol];
}

function cleanTransformers(transformers) {
  return flat(transformers).reduce(
    (transformers, transformer) =>
      isTag(transformer)
        ? [...transformers, ...transformer[tagTransformersSymbol]]
        : [...transformers, transformer],
    [],
  );
}

/**
 * An intermediary template tag that receives a template tag and passes the result of calling the template with the received
 * template tag to our own template tag.
 * @param  {Function}        nextTag          - The received template tag
 * @param  {Array<String>}   template         - The template to process
 * @param  {...*}            ...substitutions - `substitutions` is an array of all substitutions in the template
 * @return {*}                                - The final processed value
 */
function getInterimTag(originalTag, extraTag) {
  return function tag(...args) {
    return originalTag(['', ''], extraTag(...args));
  };
}

function getTagCallInfo(transformers) {
  return {
    transformers,
    context: transformers.map((transformer) =>
      transformer.getInitialContext ? transformer.getInitialContext() : {},
    ),
  };
}

/**
 * Iterate through each transformer, calling the transformer's specified hook.
 * @param {Array<Function>} transformers - The transformer functions
 * @param {String} hookName              - The name of the hook
 * @param {String} initialString         - The input string
 * @return {String}                      - The final results of applying each transformer
 */
function applyHook0({ transformers, context }, hookName, initialString) {
  return transformers.reduce(
    (result, transformer, index) =>
      transformer[hookName]
        ? transformer[hookName](result, context[index])
        : result,
    initialString,
  );
}

/**
 * Iterate through each transformer, calling the transformer's specified hook.
 * @param {Array<Function>} transformers - The transformer functions
 * @param {String} hookName              - The name of the hook
 * @param {String} initialString         - The input string
 * @param {*} arg1                       - An additional argument passed to the hook
 * @return {String}                      - The final results of applying each transformer
 */
function applyHook1({ transformers, context }, hookName, initialString, arg1) {
  return transformers.reduce(
    (result, transformer, index) =>
      transformer[hookName]
        ? transformer[hookName](result, arg1, context[index])
        : result,
    initialString,
  );
}

/**
 * Consumes a pipeline of composable transformer plugins and produces a template tag.
 * @param  {...Object} [...rawTransformers] - An array or arguments list of transformers
 * @return {Function}                       - A template tag
 */
function createTag(...rawTransformers) {
  const transformers = cleanTransformers(rawTransformers);

  function tag(strings, ...expressions) {
    if (typeof strings === 'function') {
      // if the first argument passed is a function, assume it is a template tag and return
      // an intermediary tag that processes the template using the aforementioned tag, passing the
      // result to our tag
      return getInterimTag(tag, strings);
    }

    if (!Array.isArray(strings)) {
      return tag([strings]);
    }

    const tagCallInfo = getTagCallInfo(transformers);

    // if the first argument is an array, return a transformed end result of processing the template with our tag
    const processedTemplate = strings
      .map((string) => applyHook0(tagCallInfo, 'onString', string))
      .reduce((result, string, index) =>
        ''.concat(
          result,
          applyHook1(
            tagCallInfo,
            'onSubstitution',
            expressions[index - 1],
            result,
          ),
          string,
        ),
      );

    return applyHook0(tagCallInfo, 'onEndResult', processedTemplate);
  }

  tag[tagTransformersSymbol] = transformers;

  return tag;
}

/**
 * Converts an array substitution to a string containing a list
 * @param {String} [opts.separator = '']   - The character that separates each item
 * @param {String} [opts.conjunction = ''] - Replace the last separator with this
 * @param {Boolean} [opts.serial = false]  - Include the separator before the conjunction? (Oxford comma use-case)
 *
 * @return {Object}                        - A transformer
 */
const inlineArrayTransformer = ({
  conjunction = '',
  separator = '',
  serial = false,
} = {}) => ({
  onSubstitution(substitution, resultSoFar) {
    // only operate on arrays
    if (!Array.isArray(substitution)) {
      return substitution;
    }

    const { length } = substitution;
    const lastSeparatorIndex = conjunction && !serial ? length - 2 : length - 1;
    const indentation = resultSoFar.match(/(?:\n)([^\S\n]+)$/);

    if (conjunction && length > 1) {
      substitution[length - 1] = ''.concat(
        conjunction,
        ' ',
        substitution[length - 1],
      );
    }

    return substitution.reduce((result, part, index) => {
      const isFirstPart = index === 0;
      const strippedPart = stripLastNewLine(part);
      return ''.concat(
        result,
        isFirstPart ? '' : indentation ? '\n' : ' ',
        indentation
          ? prefixLines(indentation[1], strippedPart, isFirstPart)
          : strippedPart,
        index < lastSeparatorIndex ? separator : '',
      );
    }, '');
  },
});

const isValidValue = (x) =>
  x != null && !Number.isNaN(x) && typeof x !== 'boolean';

const removeNonPrintingValuesTransformer = () => ({
  onSubstitution(substitution) {
    if (Array.isArray(substitution)) {
      return substitution.filter(isValidValue);
    }
    if (isValidValue(substitution)) {
      return substitution;
    }
    return '';
  },
});

/**
 * Replaces tabs, newlines and spaces with the chosen value when they occur in sequences
 * @param  {(String|RegExp)} replaceWhat - the value or pattern that should be replaced
 * @param  {*}               replaceWith - the replacement value
 * @return {Object}                      - a TemplateTag transformer
 */
const replaceResultTransformer = (replaceWhat, replaceWith) => {
  if (replaceWhat == null || replaceWith == null) {
    throw new Error('replaceResultTransformer requires exactly 2 arguments.');
  }

  return {
    onEndResult(endResult) {
      return endResult.replace(replaceWhat, replaceWith);
    },
  };
};

const replaceStringTransformer = (replaceWhat, replaceWith) => {
  if (replaceWhat == null || replaceWith == null) {
    throw new Error('replaceStringTransformer requires exactly 2 arguments.');
  }

  return {
    onString(str) {
      return str.replace(replaceWhat, replaceWith);
    },
  };
};

/**
 * Replaces the result of all substitutions (results of calling ${ ... }) with a new value.
 * Same as for `replaceResultTransformer`, replaceWhat can be a string or regular expression and replaceWith is the new value.
 */
const replaceSubstitutionTransformer = (replaceWhat, replaceWith) => {
  if (replaceWhat == null || replaceWith == null) {
    throw new Error(
      'replaceSubstitutionTransformer requires exactly 2 arguments.',
    );
  }

  return {
    onSubstitution(substitution) {
      // Do not touch if null or undefined
      if (substitution == null) {
        return substitution;
      } else {
        return String(substitution).replace(replaceWhat, replaceWith);
      }
    },
  };
};

/**
 * Splits a string substitution into an array by the provided splitBy substring, only if the string contains the splitBy substring.
 */
const splitStringTransformer = (splitBy) => {
  if (typeof splitBy !== 'string') {
    throw new Error('You need to specify a string character to split by.');
  }

  return {
    onSubstitution(substitution) {
      if (typeof substitution === 'string' && substitution.includes(splitBy)) {
        return substitution.split(splitBy);
      }
      return substitution;
    },
  };
};

const supportedTypes = ['initial', 'all'];

/**
 * strips indentation from a template literal
 * @param  {String} type = 'initial' - whether to remove all indentation or just leading indentation. can be 'all' or 'initial'
 * @return {Object}                  - a TemplateTag transformer
 */
const stripIndentTransformer = (type = 'initial') => {
  if (!supportedTypes.includes(type)) {
    throw new Error(`Type not supported: ${type}`);
  }

  return {
    onEndResult(endResult) {
      if (type === 'all') {
        // remove all indentation from each line
        return endResult.replace(/^[^\S\n]+/gm, '');
      }

      // remove the shortest leading indentation from each line
      const match = endResult.match(/^[^\S\n]*(?=\S)/gm);
      const indent = match && Math.min(...match.map((el) => el.length));
      if (indent) {
        const regexp = new RegExp(`^.{${indent}}`, 'gm');
        return endResult.replace(regexp, '');
      }
      return endResult;
    },
  };
};

const supportedSides = ['', 'start', 'left', 'end', 'right', 'smart'];

/**
 * TemplateTag transformer that trims whitespace on the end result of a tagged template
 * @param  {String} side = '' - The side of the string to trim. Can be 'start' or 'end' (alternatively 'left' or 'right')
 * @return {Object}           - a TemplateTag transformer
 */
const trimResultTransformer = (side = '') => {
  if (!supportedSides.includes(side)) {
    throw new Error(`Side not supported: ${side}`);
  }

  return {
    onEndResult(endResult) {
      switch (side) {
        case '':
          return endResult.trim();

        case 'start':
        case 'left':
          return endResult.replace(/^\s*/, '');

        case 'end':
        case 'right':
          return endResult.replace(/\s*$/, '');

        case 'smart':
          return endResult.replace(/[^\S\n]+$/gm, '').replace(/^\n/, '');
      }
    },
  };
};

/**
 * If you want to strip the initial indentation from the beginning of each line in a multiline string.
 * Important note: this tag will not indent multiline strings coming from the substitutions.
 * If you want that behavior, use the `html` tag (aliases: `source`, `codeBlock`).
 * @implements {TemplateTag}
 */
const stripIndent = createTag(
  stripIndentTransformer(),
  trimResultTransformer('smart'),
);

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

/**
 * Allows you to inline an array substitution as a comma-separated list.
 * @implements {TemplateTag}
 */
const commaLists = createTag(
  inlineArrayTransformer({ separator: ',' }),
  stripIndent,
);

/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "and".
 * @implements {TemplateTag}
 */
const commaListsAnd = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  stripIndent,
);

/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "or".
 * @implements {TemplateTag}
 */
const commaListsOr = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'or' }),
  stripIndent,
);

/**
 * A no-op tag that might come in useful in some scenarios, e.g. mocking.
 * @implements {TemplateTag}
 */
const id = createTag();

/**
 * Allows you to inline an array substitution as a list.
 * @implements {TemplateTag}
 */
const inlineLists = createTag(inlineArrayTransformer(), stripIndent);

/**
 * Allows you to keep your single-line strings under 80 characters without resorting to crazy string concatenation.
 * @implements {TemplateTag}
 */
const oneLine = createTag(
  replaceResultTransformer(/(?:\n(?:\s*))+/g, ' '),
  trimResultTransformer(),
);

/**
 * Allows you to inline an array substitution as a comma-separated list, and is rendered out on to a single line.
 * @implements {TemplateTag}
 */
const oneLineCommaLists = createTag(
  inlineArrayTransformer({ separator: ',' }),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer(),
);

/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "and", and is rendered out on to a single line.
 * @implements {TemplateTag}
 */
const oneLineCommaListsAnd = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer(),
);

/**
 * Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "or", and is rendered out on to a single line.
 * @implements {TemplateTag}
 */
const oneLineCommaListsOr = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'or' }),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer(),
);

/**
 * Allows you to inline an array substitution as a list, rendered out on a single line.
 * @implements {TemplateTag}
 */
const oneLineInlineLists = createTag(
  inlineArrayTransformer(),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer(),
);

/**
 * Allows you to keep your single-line strings under 80 characters while trimming the new lines.
 * @implements {TemplateTag}
 */
const oneLineTrim = createTag(
  replaceResultTransformer(/(?:\n\s*)/g, ''),
  trimResultTransformer(),
);

/**
 * A tag very similar to `html` but it does safe HTML escaping for strings coming from substitutions.
 * When combined with regular `html` tag, you can do basic HTML templating that is safe from
 * XSS (Cross-Site Scripting) attacks.
 * @implements {TemplateTag}
 */
const safeHtml = createTag(
  splitStringTransformer('\n'),
  inlineArrayTransformer(),
  stripIndent,
  replaceSubstitutionTransformer(/&/g, '&amp;'),
  replaceSubstitutionTransformer(/</g, '&lt;'),
  replaceSubstitutionTransformer(/>/g, '&gt;'),
  replaceSubstitutionTransformer(/"/g, '&quot;'),
  replaceSubstitutionTransformer(/'/g, '&#x27;'),
  replaceSubstitutionTransformer(/`/g, '&#x60;'),
);

/**
 * If you want to strip *all* of the indentation from the beginning of each line in a multiline string.
 * @implements {TemplateTag}
 */
const stripIndents = createTag(
  stripIndentTransformer('all'),
  trimResultTransformer('smart'),
);

let deprecationWarningPrinted = false;

/**
 * @class TemplateTag
 * @classdesc Consumes a pipeline of composable transformer plugins and produces a template tag.
 */
class TemplateTag {
  /**
   * constructs a template tag
   * @constructs TemplateTag
   * @param  {...Object} [...transformers] - an array or arguments list of transformers
   * @return {Function}                    - a template tag
   */
  constructor(...transformers) {
    if (!deprecationWarningPrinted) {
      // eslint-disable-next-line no-console
      console.warn(
        'TemplateTag is deprecated and will be removed in the next major version. Use createTag instead.',
      );
      deprecationWarningPrinted = true;
    }

    return createTag(...transformers);
  }
}

export { TemplateTag, html as codeBlock, commaLists, commaListsAnd, commaListsOr, createTag, html, id, inlineArrayTransformer, inlineLists, oneLine, oneLineCommaLists, oneLineCommaListsAnd, oneLineCommaListsOr, oneLineInlineLists, oneLineTrim, removeNonPrintingValuesTransformer, replaceResultTransformer, replaceStringTransformer, replaceSubstitutionTransformer, safeHtml, html as source, splitStringTransformer, stripIndent, stripIndentTransformer, stripIndents, trimResultTransformer };
