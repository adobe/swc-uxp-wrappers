## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/search` package 
<br />

-   For detailed README regarding `@spectrum-web-components/search` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/search/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/search` support in UXP through `@swc-uxp-wrappers/search` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/search
```

Import the side effectful registration of `<sp-search>` via:

```
import '@swc-uxp-wrappers/search/sp-search.js';
```

When looking to leverage the `Search` base class as a type and/or for extension purposes, do so via:

```
import { Search } from '@swc-uxp-wrappers/search';
```

<br />

## Example

---

<br />

```html
<sp-search></sp-search>
```
