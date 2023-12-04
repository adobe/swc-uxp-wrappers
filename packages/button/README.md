## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/button` package
<br />

-   For detailed README regarding `@spectrum-web-components/button` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/button/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/button` support in UXP through `@swc-uxp-wrappers/button` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/button
```

Import the side effectful registration of `<sp-button>` via:

```
import '@swc-uxp-wrappers/button/sp-button.js';
```

When looking to leverage the `Button` base class as a type and/or for extension purposes, do so via:

```
import { Button } from '@swc-uxp-wrappers/button';
```

<br />

## Example

---

<br />

```html
<sp-button></sp-button>
```
