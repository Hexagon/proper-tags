---
title: "Advanced features"
parent: Usage
nav_order: 3
---

# Advanced features

---

## Table of contents

1. Table of contents {:toc}

### Tail Processing

It's possible to pass the output of a tagged template to another template tag in
pure ES2015+:

```js
import { oneLine } from "proper-tags";

oneLine`
  ${String.raw`
    foo
    bar\nbaz
  `}
`;
// "foo bar\nbaz"
```

We can make this neater. Every tag `proper-tags` exports can delay execution if
it receives a function as its first argument. This function is assumed to be a
template tag, and is called via an intermediary tagging process before the
result is passed back to our tag. Use it like so (this code is equivalent to the
previous code block):

```js
import { oneLine } from "proper-tags";

oneLine(String.raw)`
  foo
  bar\nbaz
`;
// "foo bar\nbaz"
```

### Using Tags on Regular String Literals

Sometimes you might want to use a tag on a normal string (e.g. for stripping the
indentation). For that purpose just call a tag as a function with the passed
string:

```js
import { stripIndent } from "proper-tags";

stripIndent("  foo\n    bar");
// "foo\n  bar"
```

### Type Definitions

There are third-party type definitions for `proper-tags` on
[npm](https://www.npmjs.com/package/@types/proper-tags). Just install them like
so:

```sh
npm install @types/proper-tags
```

Please note that these type definitions are not officially maintained by the
authors of `proper-tags` - they are maintained by the TypeScript community.

### Make Your Own Template Tag

`proper-tags` exposes an interface that allows you to painlessly create your own
template tags.

#### Where It All Starts: createTag

`proper-tags` exports a `createTag` function. This function is the foundation of
`proper-tags`. The concept of the function works on the premise that
transformations occur on a template either when the template is finished being
processed (`onEndResult`), or when the tag encounters a string (`onString`) or a
substitution (`onSubstitution`). Any tag produced by this function supports
[tail processing](#tail-processing).

The easiest tag to create is a tag that does nothing:

```js
import { createTag } from "proper-tags";

const doNothing = createTag();

doNothing`foo bar`;
// 'foo bar'
```

#### The Anatomy of a Transformer

`createTag` receives either an array or argument list of `transformers`. A
`transformer` is just a plain object with three optional methods -
`getInitialContext`, `onString`, `onSubstitution` and `onEndResult` - it looks
like this:

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

You can wrap a transformer in a function that receives arguments in order to
create a dynamic plugin:

```js
const substitutionReplacer = (oldValue, newValue) => ({
  onSubstitution(substitution, resultSoFar) {
    if (substitution === oldValue) {
      return newValue;
    }
    return substitution;
  },
});

const replaceFizzWithBuzz = createTag(substitutionReplacer("fizz", "buzz"));

replaceFizzWithBuzz`foo bar ${"fizz"}`;
// "foo bar buzz"
```

#### Plugin Pipeline

You can pass a list of transformers, and `createTag` will call them on your tag
in the order they are specified:

```js
// note: passing these as an array also works
const replace = createTag(
  substitutionReplacer("fizz", "buzz"),
  substitutionReplacer("foo", "bar"),
);

replace`${"foo"} ${"fizz"}`;
// "bar buzz"
```

When multiple transformers are passed to `createTag`, they will be iterated
three times - first, all transformer `onString` methods will be called. Once
they are done processing, `onSubstitution` methods will be called. Finally, all
transformer `onEndResult` methods will be called.

#### Returning Other Values from a Transformer

All transformers get an additional context argument. You can use it to calculate
the value you need:

```js
const listSubs = {
  getInitialContext() {
    return { strings: [], subs: [] };
  },
  onString(str, context) {
    context.strings.push(str);
    return str;
  },
  onSubstitution(sub, res, context) {
    context.subs.push({ sub, precededBy: res });
    return sub;
  },
  onEndResult(res, context) {
    return context;
  },
};

const toJSON = {
  onEndResult(res) {
    return JSON.stringify(res, null, 2);
  },
};

const log = {
  onEndResult(res) {
    console.log(res);
    return res;
  },
};

const process = createTag([listSubs, toJSON, log]);

process`
  foo ${"bar"}
  fizz ${"buzz"}
`;
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

Since `proper-tags` is built on the foundation of this createTag function, it
comes with its own set of built-in transformers:

##### `trimResultTransformer([side])`

Trims the whitespace surrounding the end result. Accepts an optional `side` (can
be `"start"` or `"end"` or alternatively `"left"` or `"right"`) that when
supplied, will only trim whitespace from that side of the string.

##### `stripIndentTransformer([type='initial'])`

Strips the indents from the end result. Offers two types: `all`, which removes
all indentation from each line, and `initial`, which removes the shortest indent
level from each line. Defaults to `initial`.

##### `replaceResultTransformer(replaceWhat, replaceWith)`

Replaces a value or pattern in the end result with a new value. `replaceWhat`
can be a string or a regular expression, `replaceWith` is the new value.

##### `replaceSubstitutionTransformer(replaceWhat, replaceWith)`

Replaces the result of all substitutions (results of calling `${ ... }`) with a
new value. Same as for `replaceResultTransformer`, `replaceWhat` can be a string
or regular expression and `replaceWith` is the new value.

##### `replaceStringTransformer(replaceWhat, replaceWith)`

Replaces the result of all strings (what's not in `${ ... }`) with a new value.
Same as for `replaceResultTransformer`, `replaceWhat` can be a string or regular
expression and `replaceWith` is the new value.

##### `inlineArrayTransformer(opts)`

Converts any array substitutions into a string that represents a list. Accepts
an options object:

```js
opts = {
  separator: ",", // what to separate each item with (always followed by a space)
  conjunction: "and", // replace the last separator with this value
  serial: true, // should the separator be included before the conjunction? As in the case of serial/oxford commas
};
```

##### `splitStringTransformer(splitBy)`

Splits a string substitution into an array by the provided `splitBy` substring,
**only** if the string contains the `splitBy` substring.
