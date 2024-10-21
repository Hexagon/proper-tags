---
title: "Tags"
parent: Usage
nav_order: 2
---

# Available Tags

---

`proper-tags` exports a bunch of wonderful pre-cooked template tags for your
eager consumption. They are as follows:

## Table of contents

1. Table of contents {:toc}

#### `html`

##### Aliases: `source`, `codeBlock`

You'll often find that you might want to include an array in a template.
Typically, doing something like `${array.join(', ')}` would work - but what if
you're printing a list of items in an HTML template and want to maintain the
indentation? You'd have to count the spaces manually and include them in the
`.join()` call - which is a bit _ugly_ for my taste. This tag properly indents
arrays, as well as newline characters in string substitutions, by converting
them to an array split by newline and re-using the same array inclusion logic:

```js
import { html } from "proper-tags";
let fruits = ["apple", "orange", "watermelon"];
html`
  <div class="list">
    <ul>
      ${fruits.map((fruit) => `<li>${fruit}</li>`)}
      ${"<li>kiwi</li>\n<li>guava</li>"}
    </ul>
  </div>
`;
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

A tag very similar to `html` but it does safe HTML escaping for strings coming
from substitutions. When combined with regular `html` tag, you can do basic HTML
templating that is safe from XSS (Cross-Site Scripting) attacks.

```js
import { html, safeHtml } from "proper-tags";
let userMessages = [
  "hi",
  "what are you up to?",
  '<script>alert("something evil")</script>',
];
html`
  <div class="chat-list">
    <ul>
      ${userMessages.map((message) => safeHtml`<li>${message}</li>`)}
    </ul>
  </div>
`;
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

Allows you to keep your single-line strings under 80 characters without
resorting to crazy string concatenation.

```js
import { oneLine } from "proper-tags";

oneLine`
  foo
  bar
  baz
`;
// "foo bar baz"
```

#### `oneLineTrim`

Allows you to keep your single-line strings under 80 characters while trimming
the new lines:

```js
import { oneLineTrim } from "proper-tags";

oneLineTrim`
  https://news.com/article
  ?utm_source=designernews.co
`;
// https://news.com/article?utm_source=designernews.co
```

#### `stripIndent`

If you want to strip the initial indentation from the beginning of each line in
a multiline string:

```js
import { stripIndent } from "proper-tags";

stripIndent`
  This is a multi-line string.
  You'll ${verb} that it is indented.
  We don't want to output this indentation.
    But we do want to keep this line indented.
`;
// This is a multi-line string.
// You'll notice that it is indented.
// We don't want to output this indentation.
//   But we do want to keep this line indented.
```

Important note: this tag will not indent multiline strings coming from the
substitutions. If you want that behavior, use the `html` tag (aliases: `source`,
`codeBlock`).

#### `stripIndents`

If you want to strip _all_ of the indentation from the beginning of each line in
a multiline string:

```js
import { stripIndents } from "proper-tags";

stripIndents`
  This is a multi-line string.
  You'll ${verb} that it is indented.
  We don't want to output this indentation.
    We don't want to keep this line indented either.
`;
// This is a multi-line string.
// You'll notice that it is indented.
// We don't want to output this indentation.
// We don't want to keep this line indented either.
```

#### `inlineLists`

Allows you to inline an array substitution as a list:

```js
import { inlineLists } from "proper-tags";

inlineLists`
  I like ${["apples", "bananas", "watermelons"]}
  They're good!
`;
// I like apples bananas watermelons
// They're good!
```

#### `oneLineInlineLists`

Allows you to inline an array substitution as a list, rendered out on a single
line:

```js
import { oneLineInlineLists } from "proper-tags";

oneLineInlineLists`
  I like ${["apples", "bananas", "watermelons"]}
  They're good!
`;
// I like apples bananas watermelons They're good!
```

#### `commaLists`

Allows you to inline an array substitution as a comma-separated list:

```js
import { commaLists } from "proper-tags";

commaLists`
  I like ${["apples", "bananas", "watermelons"]}
  They're good!
`;
// I like apples, bananas, watermelons
// They're good!
```

#### `commaListsOr`

Allows you to inline an array substitution as a comma-separated list, the last
of which is preceded by the word "or":

```js
import { commaListsOr } from "proper-tags";

commaListsOr`
  I like ${["apples", "bananas", "watermelons"]}
  They're good!
`;
// I like apples, bananas or watermelons
// They're good!
```

#### `commaListsAnd`

Allows you to inline an array substitution as a comma-separated list, the last
of which is preceded by the word "and":

```js
import { commaListsAnd } from "proper-tags";

commaListsAnd`
  I like ${["apples", "bananas", "watermelons"]}
  They're good!
`;
// I like apples, bananas and watermelons
// They're good!
```

#### `oneLineCommaLists`

Allows you to inline an array substitution as a comma-separated list, and is
rendered out on to a single line:

```js
import { oneLineCommaLists } from "proper-tags";

oneLineCommaLists`
  I like ${["apples", "bananas", "watermelons"]}
  They're good!
`;
// I like apples, bananas, watermelons They're good!
```

#### `oneLineCommaListsOr`

Allows you to inline an array substitution as a comma-separated list, the last
of which is preceded by the word "or", and is rendered out on to a single line:

```js
import { oneLineCommaListsOr } from "proper-tags";

oneLineCommaListsOr`
  I like ${["apples", "bananas", "watermelons"]}
  They're good!
`;
// I like apples, bananas or watermelons They're good!
```

#### `oneLineCommaListsAnd`

Allows you to inline an array substitution as a comma-separated list, the last
of which is preceded by the word "and", and is rendered out on to a single line:

```js
import { oneLineCommaListsAnd } from "proper-tags";

oneLineCommaListsAnd`
  I like ${["apples", "bananas", "watermelons"]}
  They're good!
`;
// I like apples, bananas and watermelons They're good!
```

#### `id`

A no-op tag that might come in useful in some scenarios, e.g. mocking.

```js
import { id } from "proper-tags";

id`hello ${"world"}`;
// hello world
```
