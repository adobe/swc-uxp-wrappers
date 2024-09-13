## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/accordion` package 
<br />

-   For detailed README regarding `@spectrum-web-components/accordion` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/accordion/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/accordion` support in UXP through `@swc-uxp-wrappers/accordion` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/accordion
```

Import the side effectful registration of `<sp-accordion>` via:

```
import '@swc-uxp-wrappers/accordion/sp-accordion.js';
```

When looking to leverage the `Accordion` base class as a type and/or for extension purposes, do so via:

```
import { Accordion } from '@swc-uxp-wrappers/accordion';
```

<br />

## Example

---

<br />

```html
<sp-accordion></sp-accordion>
```
