---
layout: page
title: "Installation"
nav_order: 2
---

# Installation

---

## Node

**Install**
    
    npm install proper-tags

**ESM Import**

    import { stripIndent } from 'proper-tags';

**Legacy CommonJS Require**

    const { stripIndent } = require('proper-tags');

## Deno 

To use `proper-tags` with **Deno**, follow the import example:

    import { html } from 'https://deno.land/x/proper_tags/dist/proper-tags.js';

> **Note:** Make sure to freeze the url to a specific version

## CDN/Browser

For usage via **jsdelivr** in the browser:

    <script src="https://cdn.jsdelivr.net/npm/proper-tags@2.0.0-beta.0/dist/proper-tags.umd.js"></script>

> **Note:** Ensure you're using the latest version in the URL.
