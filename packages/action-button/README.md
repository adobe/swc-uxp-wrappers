## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/action-button` package
<br />

-   For detailed README regarding `@spectrum-web-components/action-button` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/action-button/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/action-button` support in UXP through `@swc-uxp-wrappers/action-button` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/action-button
```

Import the side effectful registration of `<sp-action-button>` via:

```
import '@swc-uxp-wrappers/action-button/sp-action-button.js';
```

When looking to leverage the `ActionButton` base class as a type and/or for extension purposes, do so via:

```
import { ActionButton } from '@swc-uxp-wrappers/action-button';
```

<br />

## Example

---

<br />

```html
<sp-action-button></sp-action-button>
```
