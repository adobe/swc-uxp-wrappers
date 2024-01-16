## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/quick-actions` package 
<br />

-   For detailed README regarding `@spectrum-web-components/quick-actions` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/quick-actions/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/quick-actions` support in UXP through `@swc-uxp-wrappers/quick-actions` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/quick-actions
```

Import the side effectful registration of `<sp-quick-actions>` via:

```
import '@swc-uxp-wrappers/quick-actions/sp-quick-actions.js';
```

When looking to leverage the `QuickActions` base class as a type and/or for extension purposes, do so via:

```
import { QuickActions } from '@swc-uxp-wrappers/quick-actions';
```

<br />

## Example

---

<br />

```html
<sp-quick-actions></sp-quick-actions>
```
