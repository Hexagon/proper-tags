---
layout: page
title: "Overview"
nav_order: 1
---

# proper-tags Documentation

---

**proper-tags** is an evolved version of the widely-used CommonJS package **common-tags**. It has been updated with the following considerations for modern JavaScript environments:

🌟 Extendable: proper-tags comes with built-in tools for creating custom tags.
📦 ESM Code Base: With support for ESM/ECMAScript Modules, it ensures native compatibility with modern development tools.
🦕 Deno Compatibility: Designed specifically to function seamlessly with the Deno runtime.
📝 TypeScript Definitions: Integrated TypeScript typings make development in TypeScript a breeze.
🔄 API Consistency: Its interface aligns with common-tags, ensuring compatibility with existing frameworks and guides.

## Sample Usage

```js
import { html } from 'proper-tags';

html`
  <div id="user-card">
    <h2>${user.name}</h2>
  </div>
```

