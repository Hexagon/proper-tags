# proper-tags (commmon-tags rebooted)

[![npm version](https://badge.fury.io/js/proper-tags.svg)](https://badge.fury.io/js/proper-tags) [![NPM Downloads](https://img.shields.io/npm/dw/proper-tags.svg)](https://www.npmjs.org/package/proper-tags)
![No dependencies](https://img.shields.io/badge/dependencies-none-brightgreen) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Hexagon/proper-tags/blob/master/LICENSE)

**proper-tags** is an evolved version of the widely-used CommonJS package **common-tags**. It has been updated with the following considerations for modern JavaScript environments:

🌟 Extendable: proper-tags comes with built-in tools for creating custom tags.
📦 ESM Code Base: With support for ESM/ECMAScript Modules, it ensures native compatibility with modern development tools.
🦕 Deno Compatibility: Designed specifically to function seamlessly with the Deno runtime.
📝 TypeScript Definitions: Integrated TypeScript typings make development in TypeScript a breeze.
🔄 API Consistency: Its interface aligns with common-tags, ensuring compatibility with existing frameworks and guides.

Below is a quick guide, check out the full documentation at [https://proper-tags.56k.guru](https://proper-tags.56k.guru).

## Quick Example

```js
import { html } from 'proper-tags';

html`
  <div id="user-card">
    <h2>${user.name}</h2>
  </div>
`
```
## Installation

### Node

Install

```js
npm install proper-tags
```

ESM Import:

```js
import { stripIndent } from 'proper-tags';
```

Legacy CommonJS Require:

```js
const { stripIndent } = require('proper-tags');
```

### Deno 

To use `proper-tags` with **Deno**, import it from deno.land:

```js
import { html } from 'https://deno.land/x/proper_tags/dist/proper-tags.js';
```

> **Note:** Make sure to freeze the url to a specific version

### CDN/Browser

To include proper-tags via **jsdelivr**, add the following script tag to your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/proper-tags@2.0.1/dist/proper-tags.umd.js"></script>
```

> **Note:** Make sure to replace `2.0.1` with the latest version


## Usage

### Imports

Like all ES modules, `proper-tags` begins with an `import`.

```js
import { stripIndent } from 'proper-tags'
```

### Available Functions

* `html`: Properly indents arrays and newline characters in string substitutions.
   * Aliases: `source`, `codeBlock`
* `safeHtml`: Similar to html, but with safe HTML escaping for strings.
* `oneLine`: Converts multi-line strings into a single line.
* `oneLineTrim`: Converts multi-line strings into a single line, trimming newlines.
* `stripIndent`: Strips the initial indentation from the beginning of each line in a multiline string.
* `stripIndents`: Strips all indentation from the beginning of each line in a multiline string.
* `inlineLists`: Inlines an array substitution as a list.
* `oneLineInlineLists`: Inlines an array substitution as a list, rendered on a single line.
* `commaLists`: Inlines an array substitution as a comma-separated list.
* `commaListsOr`: Inlines an array as a comma-separated list, with the last item prefixed by "or".
* `commaListsAnd`: Inlines an array as a comma-separated list, with the last item prefixed by "and".
* `oneLineCommaLists`: Inlines an array as a comma-separated list on a single line.
* `oneLineCommaListsOr`: Inlines an array as a comma-separated list on a single line, with the last item prefixed by "or".
* `oneLineCommaListsAnd`: Inlines an array as a comma-separated list on a single line, with the last item prefixed by "and".
* `id`: A no-op tag useful in scenarios like mocking.

For more information, examples, functions for advanced usage and best practices, refer to the documentation at [proper-tags.56k.guru](https://proper-tags.56k.guru).

## How to Contribute

Please see the [Contribution Guidelines](https://proper-tags.56k.guru/contributing.html).

## License

MIT. See [license](https://proper-tags.56k.guru/license.html).
