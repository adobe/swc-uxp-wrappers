## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/action-bar` package 
<br />

-   For detailed README regarding `@spectrum-web-components/action-bar` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/action-bar/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/action-bar` support in UXP through `@swc-uxp-wrappers/action-bar` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/action-bar
```

Import the side effectful registration of `<sp-action-bar>` via:

```
import '@swc-uxp-wrappers/action-bar/sp-action-bar.js';
```

When looking to leverage the `ActionBar` base class as a type and/or for extension purposes, do so via:

```
import { ActionBar } from '@swc-uxp-wrappers/action-bar';
```

<br />

## Example

---

<br />

```html
<sp-action-bar></sp-action-bar>
```
