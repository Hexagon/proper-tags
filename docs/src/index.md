---
title: "Overview"
nav_order: 1
---

# proper-tags Documentation

---

**proper-tags** is an evolved version of the widely-used CommonJS package
**common-tags**. It has been updated with the following considerations for
modern JavaScript environments:

- 🌟 **Extendable:** Comes with built-in tools for creating custom tags.
- 📦 **ESM Code Base:** Ensures native compatibility with modern development
  tools.
- 🦕 **Deno Compatibility:** Designed specifically to function seamlessly with
  the Deno runtime.
- 📝 **TypeScript Definitions:** Integrated TypeScript typings make development
  in TypeScript a breeze.
- 🔄 **API Consistency:** The interface aligns with common-tags, ensuring
  compatibility with existing frameworks and guides.

## Sample Usage

```js
import { html } from 'proper-tags';

html`
  <div id="user-card">
    <h2>${user.name}</h2>
  </div>
```

For further details, check out the
[Installation](https://proper-tags.56k.guru/installation.html) and
[Usage](https://proper-tags.56k.guru/usage/) sections.
