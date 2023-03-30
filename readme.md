# proper-tags (commmon-tags rebooted)

🔖 A set of **well-tested**, commonly used template literal tag functions, 

🌟 Plus some extra goodies for easily making your own tags.

## Example

```js
import { html } from 'proper-tags';

html`
  <div id="user-card">
    <h2>${user.name}</h2>
  </div>
`
```

## Introduction

Meet proper-tags, a refreshed and improved fork of the widely-used common-tags package, updated to meet the demands of modern JavaScript development. This updated package incorporates several key enhancements that make it more accessible for today's development workflows:

* **Enhanced ESM Support:** proper-tags now offers full compliance with ECMAScript Modules, facilitating seamless integration with popular bundlers such as Webpack and Rollup, as well as native support in Deno and Bun (and Node, of course)
* **Native TypeScript Typings:** With built-in TypeScript typings, proper-tags streamlines the development process for TypeScript users, providing a smoother experience overall.
Deno Compatibility: proper-tags has been adapted to ensure compatibility with the Deno runtime, allowing developers to leverage its capabilities in Deno-based projects.
* **Unchanged interface:** Fully compatible with existing guides and frameworks.

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
<script src="https://cdn.jsdelivr.net/npm/proper-tags@2.0.0-beta.0/dist/proper-tags.umd.js"></script>
```

> **Note:** Make sure to replace `2.0.0-beta.0` with the latest version


## Usage

### Imports

Like all modules, `proper-tags` begins with an `import`. In fact, `proper-tags` supports two styles of import:

**Named imports:**

```js
import {stripIndent} from 'proper-tags'
```

### Available Tags

`proper-tags` exports a bunch of wonderful pre-cooked template tags for your eager consumption. They are as follows:

#### `html`

##### Aliases: `source`, `codeBlock`

You'll often find that you might want to include an array in a template. Typically, doing something like `${array.join(', ')}` would work - but what if you're printing a list of items in an HTML template and want to maintain the indentation? You'd have to count the spaces manually and include them in the `.join()` call - which is a bit *ugly* for my taste. This tag properly indents arrays, as well as newline characters in string substitutions, by converting them to an array split by newline and re-using the same array inclusion logic:

```js
import {html} from 'proper-tags'
let fruits = ['apple', 'orange', 'watermelon']
html`
  <div class="list">
    <ul>
      ${fruits.map(fruit => `<li>${fruit}</li>`)}
      ${'<li>kiwi</li>\n<li>guava</li>'}
    </ul>
  </div>
`
```

Outputs:

```html
<div class="list">
  <ul>
    <li>apple</li>
    <li>orange</li>
    <li>watermelon</li>
    <li>kiwi</li>
    <li>guava</li>
  </ul>
</div>
```

#### `safeHtml`

A tag very similar to `html` but it does safe HTML escaping for strings coming from substitutions. When combined with regular `html` tag, you can do basic HTML templating that is safe from XSS (Cross-Site Scripting) attacks.

```js
import {html, safeHtml} from 'proper-tags'
let userMessages = ['hi', 'what are you up to?', '<script>alert("something evil")</script>']
html`
  <div class="chat-list">
    <ul>
      ${userMessages.map(message => safeHtml`<li>${message}</li>`)}
    </ul>
  </div>
`
```

Outputs:

```html
<div class="chat-list">
  <ul>
    <li>hi</li>
    <li>what are you up to?</li>
    <li>&lt;script&gt;alert(&quot;something evil&quot;)&lt;/script&gt;</li>
  </ul>
</div>
```

#### `oneLine`

Allows you to keep your single-line strings under 80 characters without resorting to crazy string concatenation.

```js
import {oneLine} from 'proper-tags'

oneLine`
  foo
  bar
  baz
`
// "foo bar baz"
```

#### `oneLineTrim`

Allows you to keep your single-line strings under 80 characters while trimming the new lines:

```js
import {oneLineTrim} from 'proper-tags'

oneLineTrim`
  https://news.com/article
  ?utm_source=designernews.co
`
// https://news.com/article?utm_source=designernews.co
```

#### `stripIndent`

If you want to strip the initial indentation from the beginning of each line in a multiline string:

```js
import {stripIndent} from 'proper-tags'

stripIndent`
  This is a multi-line string.
  You'll ${verb} that it is indented.
  We don't want to output this indentation.
    But we do want to keep this line indented.
`
// This is a multi-line string.
// You'll notice that it is indented.
// We don't want to output this indentation.
//   But we do want to keep this line indented.
```

Important note: this tag will not indent multiline strings coming from the substitutions. If you want that behavior, use the `html` tag (aliases: `source`, `codeBlock`).

#### `stripIndents`

If you want to strip *all* of the indentation from the beginning of each line in a multiline string:

```js
import {stripIndents} from 'proper-tags'

stripIndents`
  This is a multi-line string.
  You'll ${verb} that it is indented.
  We don't want to output this indentation.
    We don't want to keep this line indented either.
`
// This is a multi-line string.
// You'll notice that it is indented.
// We don't want to output this indentation.
// We don't want to keep this line indented either.
```

#### `inlineLists`

Allows you to inline an array substitution as a list:

```js
import {inlineLists} from 'proper-tags'

inlineLists`
  I like ${['apples', 'bananas', 'watermelons']}
  They're good!
`
// I like apples bananas watermelons
// They're good!
```

#### `oneLineInlineLists`

Allows you to inline an array substitution as a list, rendered out on a single line:

```js
import {oneLineInlineLists} from 'proper-tags'

oneLineInlineLists`
  I like ${['apples', 'bananas', 'watermelons']}
  They're good!
`
// I like apples bananas watermelons They're good!
```

#### `commaLists`

Allows you to inline an array substitution as a comma-separated list:

```js
import {commaLists} from 'proper-tags'

commaLists`
  I like ${['apples', 'bananas', 'watermelons']}
  They're good!
`
// I like apples, bananas, watermelons
// They're good!
```

#### `commaListsOr`

Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "or":

```js
import {commaListsOr} from 'proper-tags'

commaListsOr`
  I like ${['apples', 'bananas', 'watermelons']}
  They're good!
`
// I like apples, bananas or watermelons
// They're good!
```

#### `commaListsAnd`

Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "and":

```js
import {commaListsAnd} from 'proper-tags'

commaListsAnd`
  I like ${['apples', 'bananas', 'watermelons']}
  They're good!
`
// I like apples, bananas and watermelons
// They're good!
```

#### `oneLineCommaLists`

Allows you to inline an array substitution as a comma-separated list, and is rendered out on to a single line:

```js
import {oneLineCommaLists} from 'proper-tags'

oneLineCommaLists`
  I like ${['apples', 'bananas', 'watermelons']}
  They're good!
`
// I like apples, bananas, watermelons They're good!
```

#### `oneLineCommaListsOr`

Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "or", and is rendered out on to a single line:

```js
import {oneLineCommaListsOr} from 'proper-tags'

oneLineCommaListsOr`
  I like ${['apples', 'bananas', 'watermelons']}
  They're good!
`
// I like apples, bananas or watermelons They're good!
```

#### `oneLineCommaListsAnd`

Allows you to inline an array substitution as a comma-separated list, the last of which is preceded by the word "and", and is rendered out on to a single line:

```js
import {oneLineCommaListsAnd} from 'proper-tags'

oneLineCommaListsAnd`
  I like ${['apples', 'bananas', 'watermelons']}
  They're good!
`
// I like apples, bananas and watermelons They're good!
```

#### `id`

A no-op tag that might come in useful in some scenarios, e.g. mocking.

```js
import {id} from 'proper-tags'

id`hello ${'world'}`
// hello world
```

## Advanced Usage

### Tail Processing

It's possible to pass the output of a tagged template to another template tag in pure ES2015+:

```js
import {oneLine} from 'proper-tags'

oneLine`
  ${String.raw`
    foo
    bar\nbaz
  `}
`
// "foo bar\nbaz"
```

We can make this neater. Every tag `proper-tags` exports can delay execution if it receives a function as its first argument. This function is assumed to be a template tag, and is called via an intermediary tagging process before the result is passed back to our tag. Use it like so (this code is equivalent to the previous code block):

```js
import {oneLine} from 'proper-tags'

oneLine(String.raw)`
  foo
  bar\nbaz
`
// "foo bar\nbaz"
```

### Using Tags on Regular String Literals

Sometimes you might want to use a tag on a normal string (e.g. for stripping the indentation). For that purpose just call a tag as a function with the passed string:

```js
import {stripIndent} from 'proper-tags'

stripIndent("  foo\n    bar")
// "foo\n  bar"
```

### Type Definitions

There are third-party type definitions for `proper-tags` on [npm](https://www.npmjs.com/package/@types/proper-tags). Just install them like so:

```sh
npm install @types/proper-tags
```

Please note that these type definitions are not officially maintained by the authors of
`proper-tags` - they are maintained by the TypeScript community.

### Make Your Own Template Tag

`proper-tags` exposes an interface that allows you to painlessly create your own template tags.

#### Where It All Starts: createTag

`proper-tags` exports a `createTag` function. This function is the foundation of `proper-tags`. The concept of the function works on the premise that transformations occur on a template either when the template is finished being processed (`onEndResult`), or when the tag encounters a string (`onString`) or a substitution (`onSubstitution`). Any tag produced by this function supports [tail processing](#tail-processing).

The easiest tag to create is a tag that does nothing:

```js
import {createTag} from 'proper-tags'

const doNothing = createTag()

doNothing`foo bar`
// 'foo bar'
```

#### The Anatomy of a Transformer

`createTag` receives either an array or argument list of `transformers`. A `transformer` is just a plain object with three optional methods - `getInitialContext`, `onString`, `onSubstitution` and `onEndResult` - it looks like this:

```js
{
  getInitialContext () {
    // optional. Called before everything else.
    // The result of this hook will be passed to other hooks as `context`.
    // If omitted, `context` will be an empty object.
  },
  onString (str, context) {
    // optional. Called when the tag encounters a string.
    // (a string is whatever's not inside "${}" in your template literal)
    // `str` is the value of the current string
  },
  onSubstitution (substitution, resultSoFar, context) {
    // optional. Called when the tag encounters a substitution.
    // (a substitution is whatever's inside "${}" in your template literal)
    // `substitution` is the value of the current substitution
    // `resultSoFar` is the end result up to the point of this substitution
  },
  onEndResult (endResult, context) {
    // optional. Called when all substitutions have been parsed
    // `endResult` is the final value.
  }
}
```

#### Plugin Transformers

You can wrap a transformer in a function that receives arguments in order to create a dynamic plugin:

```js
const substitutionReplacer = (oldValue, newValue) => ({
  onSubstitution(substitution, resultSoFar) {
    if (substitution === oldValue) {
      return newValue
    }
    return substitution
  }
})

const replaceFizzWithBuzz = createTag(substitutionReplacer('fizz', 'buzz'))

replaceFizzWithBuzz`foo bar ${"fizz"}`
// "foo bar buzz"
```

#### Plugin Pipeline

You can pass a list of transformers, and `createTag` will call them on your tag in the order they are specified:

```js
// note: passing these as an array also works
const replace = createTag(
  substitutionReplacer('fizz', 'buzz'),
  substitutionReplacer('foo', 'bar')
)

replace`${"foo"} ${"fizz"}`
// "bar buzz"
```

When multiple transformers are passed to `createTag`, they will be iterated three times - first, all transformer `onString` methods will be called. Once they are done processing, `onSubstitution` methods will be called. Finally, all transformer `onEndResult` methods will be called.

#### Returning Other Values from a Transformer

All transformers get an additional context argument. You can use it to calculate the value you need:

```js
const listSubs = {
  getInitialContext() {
    return { strings: [], subs: [] }
  },
  onString(str, context) {
    context.strings.push(str)
    return str
  },
  onSubstitution(sub, res, context) {
    context.subs.push({ sub, precededBy: res })
    return sub
  },
  onEndResult(res, context) {
    return context
  }
}

const toJSON = {
  onEndResult(res) {
    return JSON.stringify(res, null, 2)
  }
}

const log = {
  onEndResult(res) {
    console.log(res)
    return res
  }
}

const process = createTag([listSubs, toJSON, log])

process`
  foo ${'bar'}
  fizz ${'buzz'}
`
// {
//  "strings": [
//    "\n  foo ",
//    "\n  foo bar\n  fizz ",
//    "\n" 
//  ],
//  "subs": [
//    {
//      "sub": "bar",
//      "precededBy": "\n  foo "
//    },
//    {
//      "sub": "buzz",
//      "precededBy": "\n  foo bar\n  fizz "
//    }
//  ]
// }
```

#### List of Built-in Transformers

Since `proper-tags` is built on the foundation of this createTag function, it comes with its own set of built-in transformers:

##### `trimResultTransformer([side])`

Trims the whitespace surrounding the end result. Accepts an optional `side` (can be `"start"` or `"end"` or alternatively `"left"` or `"right"`) that when supplied, will only trim whitespace from that side of the string.

##### `stripIndentTransformer([type='initial'])`

Strips the indents from the end result. Offers two types: `all`, which removes all indentation from each line, and `initial`, which removes the shortest indent level from each line. Defaults to `initial`.

##### `replaceResultTransformer(replaceWhat, replaceWith)`

Replaces a value or pattern in the end result with a new value. `replaceWhat` can be a string or a regular expression, `replaceWith` is the new value.

##### `replaceSubstitutionTransformer(replaceWhat, replaceWith)`

Replaces the result of all substitutions (results of calling `${ ... }`) with a new value. Same as for `replaceResultTransformer`, `replaceWhat` can be a string or regular expression and `replaceWith` is the new value.

##### `replaceStringTransformer(replaceWhat, replaceWith)`

Replaces the result of all strings (what's not in `${ ... }`) with a new value. Same as for `replaceResultTransformer`, `replaceWhat` can be a string or regular expression and `replaceWith` is the new value.

##### `inlineArrayTransformer(opts)`

Converts any array substitutions into a string that represents a list. Accepts an options object:

```js
opts = {
  separator: ',', // what to separate each item with (always followed by a space)
  conjunction: 'and', // replace the last separator with this value
  serial: true // should the separator be included before the conjunction? As in the case of serial/oxford commas
}
```

##### `splitStringTransformer(splitBy)`

Splits a string substitution into an array by the provided `splitBy` substring, **only** if the string contains the `splitBy` substring.

## How to Contribute

Please see the [Contribution Guidelines](contributing.md).

## License

MIT. See [license.md](license.md).

## Other ES2015 Template Tag Modules

If `proper-tags` doesn't quite fit your bill, and you just can't seem to find what you're looking for - perhaps these might be of use to you?

- [common-tags](https://github.com/zspecza/common-tags) - the original which this repository where forked from
- [tage](https://www.npmjs.com/package/tage) - make functions work as template tags too
- [is-tagged](https://www.npmjs.com/package/is-tagged) - Check whether a function call is initiated by a tagged template string or invoked in a regular way
- [es6-template-strings](https://www.npmjs.com/package/es6-template-strings) - Compile and resolve template strings notation as specified in ES6
- [t7](https://github.com/trueadm/t7) - A light-weight virtual-dom template library
- [html-template-tag](https://www.npmjs.com/package/html-template-tag) - ES6 Tagged Template for compiling HTML template strings.
- [clean-tagged-string](https://www.npmjs.com/package/clean-tagged-string) - A simple utility function to clean ES6 template strings.
- [multiline-tag](https://www.npmjs.com/package/multiline-tag) - Tags for template strings making them behave like coffee multiline strings
- [deindent](https://www.npmjs.com/package/deindent) - ES6 template string helper for deindentation.
- [heredoc-tag](https://www.npmjs.com/package/heredoc-tag) - Heredoc helpers for ES2015 template strings
- [regx](https://www.npmjs.com/package/regx) - Tagged template string regular expression compiler.
- [regexr](https://www.npmjs.org/package/regexr) - Provides an ES6 template tag function that makes it easy to compose regexes out of template strings without double-escaped hell.
- [url-escape-tag](https://www.npmjs.com/package/url-escape-tag) - A template tag for escaping url parameters based on ES2015 tagged templates.
- [shell-escape-tag](https://www.npmjs.com/package/shell-escape-tag) - An ES6+ template tag which escapes parameters for interpolation into shell commands.
- [sql-tags](https://www.npmjs.com/package/sql-tags) - ES6 tagged template string functions for SQL statements.
- [sql-tag](https://www.npmjs.com/package/sql-tag) - A template tag for writing elegant sql strings.
- [sequelize-sql-tag](https://www.npmjs.com/package/sequelize-sql-tag) - A sequelize plugin for sql-tag
- [pg-sql-tag](https://www.npmjs.com/package/pg-sql-tag) - A pg plugin for sql-tag
- [sql-template-strings](https://www.npmjs.com/package/sql-template-strings) - ES6 tagged template strings for prepared statements with mysql and postgres
- [sql-composer](https://www.npmjs.com/package/sql-composer) - Composable SQL template strings for Node.js
- [pg-template-tag](https://www.npmjs.com/package/pg-template-tag) - ECMAScript 6 (2015) template tag function to write queries for node-postgres.
- [digraph-tag](https://www.npmjs.com/package/digraph-tag) - ES6 string template tag for quickly generating directed graph data
- [es2015-i18n-tag](https://www.npmjs.com/package/es2015-i18n-tag) - ES2015 template literal tag for i18n and l10n translation and localization
