## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/action-menu` package 
<br />

-   For detailed README regarding `@spectrum-web-components/action-menu` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/action-menu/v/0.39.0)

-   Detailed specification regarding `@spectrum-web-components/action-menu` support in UXP through `@swc-uxp-wrappers/action-menu` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/action-menu
```

Import the side effectful registration of `<sp-action-menu>` via:

```
import '@swc-uxp-wrappers/action-menu/sp-action-menu.js';
```

When looking to leverage the `ActionMenu` base class as a type and/or for extension purposes, do so via:

```
import { ActionMenu } from '@swc-uxp-wrappers/action-menu';
```

<br />

## Example

---

<br />

```html
<sp-action-menu></sp-action-menu>
```
